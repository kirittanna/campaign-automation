import { generate } from "@/lib/genai/image-replicate";
import productImagePrompt from "@/lib/prompts/product-image";
import { CampaignBrief } from "@/lib/schema";

const generateProductImages = async (data: Partial<CampaignBrief>) => {
  // a. brand attributes
  // b. product attributes
  // c. campaign message 
  // d. target region
  // e. audience
  const { campaignId, products, targetAudience, targetRegion } = data;

  if (!campaignId || !products) return [];
  
  const images = await Promise.all(products.filter(p => !p.image).map(async (p) => {
    const result = await generate({
      aspectRatio: "1:1",
      prompt: productImagePrompt(p.name, p.description, targetAudience as string, targetRegion as string),
      size: '1024x1024',
      count: 1,
    });

    return {
      product: p,
      image: result.image,
    };
  }));

  console.log("Generated product images for campaign", campaignId);

  return images;
}

export default generateProductImages;