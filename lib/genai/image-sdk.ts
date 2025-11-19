import { experimental_generateImage as generateImage } from 'ai';
import { openai } from '@ai-sdk/openai';
import { ImageGenerationOptions } from './types';

export async function generate(options: ImageGenerationOptions) {
  try {
    const model = openai.image('dall-e-3')
    const result = await generateImage({
      model,
      prompt: options.prompt,
      size: options.size,
      n: options.count,
      providerOptions: options.providerOptions,
    });

    return result;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}