import { inngest } from "../client";
import { CampaignBriefSchema, Creative } from "@/lib/schema";
import generateProductImages from "@/lib/core/generate-product-images";
import generateHeroImages from "@/lib/core/generate-hero-image-inputs";
import generateMessage from "@/lib/core/generate-message";
import prisma from '@/lib/prisma';
import upload from "@/lib/core/upload-server";
import saveImageToFS from '@/lib/core/save-image-fs'

const generateCampaignHeros = inngest.createFunction(
  { id: "generate-campaign-heros" },
  { event: "generate/campaign.heros" },
  async ({ event, step }) => {
    // 1. Validate the incoming data against the schema
    const brief = CampaignBriefSchema.parse(event.data);
    const { campaignId, campaignName, campaignMessage, locales, products, brandColors, targetAudience, targetRegion } = brief;
    const allProductsHaveImages = products.every(p => !!p.image);

    // 2. Create a new campaign entry in the database with the provided brief
    console.log("Processing campaign brief for campaign", campaignId);
    const campaign = await step.run("create-campaign-entry", async () => {
      const result = await prisma.campaign.create({
        data: {
          id: campaignId,
          name: campaignName,
          brief: JSON.stringify(brief)
        }
      });
      return result;
    });

    // 2.1 Add creatives for products
    const productCreatives = await step.run("create-product-creatives", async () => {
      const output = await Promise.all(
        brief.products.map(async product => {
          const result = await prisma.creative.create({
            data: {
              aspectRatio: '1:1',
              campaignId,
              metadata: JSON.stringify({
                type: 'product',
              }),
              name: product.name,
              url: product.image ?? '',
            }
          });
          return result;
        })
      )
      return output
    });

    // 3. Generate product assets if not provided
    if (!allProductsHaveImages) {
      console.log("Generating product images for campaign", campaignId);
      const productImages = await step.run("generate-product-images", async () => {
        const result = await generateProductImages({ campaignId, products: products.filter(p => !p.image), targetAudience, targetRegion });

        const output: Creative[] = []

        // Upload generated product images to blob storage and save to database
        for (const item of result) {
          const fileExtension = item.image.mediaType.split('/').pop();
          const productId = productCreatives.find(c => c.name === item.product.name)?.id;
          const response = await upload(`${campaignId}/products/${productId}.${fileExtension}`, new Blob([new Uint8Array(item.image.uint8Array)]), { campaignId, type: 'product' });
          console.log(`Uploaded product image`, productId, response.url);
          saveImageToFS(campaignId as string, productId as string, item.image);
          const data = await prisma.creative.update({
            where: { id: productId as string },
            data: {
              url: response.url,
            }
          });

          output.push(data as unknown as Creative);
        }

        return output;
      });
    }

    const latestCreatives = await step.run("get-latest-creatives", async () => {
      return await prisma.creative.findMany({
        where: { campaignId: campaignId }
      });
    });

    // 4. Generate campaign hero assets in different sizes
    // 4.1 Brand compliance, legal content checks etc.
    console.log("Generating hero images for campaign", campaignId);
    await step.run("generate-hero-images", async () => {
      const latestProductCreatives = latestCreatives.filter(p => JSON.parse(p.metadata as string).type === 'product')
      console.log('Generate hero images using these inputs', latestProductCreatives.map(p => p.url).join(', '))
      const result = await generateHeroImages({
        campaignId,
        campaignName,
        campaignMessage,
        products: latestProductCreatives.map(c => ({
          id: c.id as string,
          name: c.name as string,
          description: '',
          image: c.url as string,
        })), brandColors, targetAudience, targetRegion
      });

      const output = []

      // Upload generated hero images to blob storage and save to database
      for (const item of result) {
        const fileExtension = item.image.mediaType.split('/').pop();
        const response = await upload(`${campaignId}/heros/${item.size}.${fileExtension}`, new Blob([new Uint8Array(item.image.uint8Array)]), { campaignId, type: 'product' });
        console.log(`Uploaded hero image`, item.size, response.url);
        saveImageToFS(campaignId as string, item.size, item.image);
        const data = await prisma.creative.create({
          data: {
            aspectRatio: item.aspectRatio,
            campaignId,
            metadata: JSON.stringify({
              type: 'hero',
            }),
            name: item.size,
            url: response.url,
          }
        });

        output.push(data);
      }

      return output;
    });

    // 5. Add campaign message to the campaign assets
    console.log("Generating campaign messages", campaignMessage);
    await step.run("generate-campaign-messages", async () => {
      const result = await generateMessage({ campaignName, campaignMessage, products: products.map(p => p.name), targetAudience, targetRegion, locales });

      const output = []

      for (const item of result.data.messages) {
        console.log(`Generated message for locale`, item.locale, item.message);

        const data = await prisma.campaignMessage.create({
          data: {
            campaignId,
            message: item.message,
            locale: item.locale,
          }
        });

        output.push(data);
      }

      return output;
    });

    // 6. Store and preview final assets
    await step.run("finalize-campaign", async () => {
      const result = await prisma.campaign.update({
        where: { id: campaignId },
        data: {
          ready: true,
        }
      });
      return result;
    });
  }
);

export default generateCampaignHeros;