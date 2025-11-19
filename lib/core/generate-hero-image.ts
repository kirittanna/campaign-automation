import { generate } from "@/lib/genai/image-replicate";
import campaignHeroPrompt from "@/lib/prompts/campaign-hero";
import { AspectRatio, ImageSize } from "@/lib/genai/types";
import { CampaignBrief } from "../schema";

const OUTPUT: {
    aspectRatio: AspectRatio;
    size: ImageSize;
    prompt: string
}[] = [{
    aspectRatio: '1:1',
    prompt: 'Optimize for square format. All text should be clear and legible.',
    size: '1024x1024',
}, {
    aspectRatio: '16:9',
    prompt: 'Optimize for wide format. All text should be clear and legible.',
    size: '1792x1024',
}, {
    aspectRatio: '9:16',
    prompt: 'Optimize for vertical format. All text should be clear and legible.',
    size: '1024x1792',
}];

const generateHeroImages = async (data: Partial<CampaignBrief>) => {
    const { brandColors, campaignId, campaignName, campaignMessage, products, targetAudience, targetRegion } = data;

    const heros = await Promise.all(OUTPUT.map(async ({ aspectRatio, prompt, size }) => {
        const result = await generate({
            aspectRatio,
            prompt: campaignHeroPrompt(
                'creative',
                campaignName as string,
                campaignMessage as string,
                'clean contrasting background',
                'large bold typography',
                brandColors as string[],
                products?.map((p) => p.name) as string[],
                targetAudience as string,
                targetRegion as string,
                prompt
            ),
            size,
            count: 1,
        });

        return result;
    }));
    console.log("Hero images generated for campaign", campaignId);

    return heros.map((result, index) => ({
        aspectRatio: OUTPUT[index].aspectRatio,
        size: OUTPUT[index].size,
        image: result.image,
    }));
};

export default generateHeroImages;