import generate from "../genai/text-openai";
import { MessageGenerationOptions } from "../genai/types";
import camppaignMessagePrompt from "../prompts/campaign-message";

export default async function ({
    locales,
    products,
    targetAudience,
    targetRegion,
    campaignMessage,
}: MessageGenerationOptions) {
    return await generate({
        prompt: camppaignMessagePrompt(products.join(', '), targetAudience, targetRegion, campaignMessage, locales),
        system: `Act as a creative marketing strategist. Your goal is to generate campaign message ideas for ${products.join(', ')} targeting ${targetAudience} in ${targetRegion}.`,
        temperature: 0.5
    })
}