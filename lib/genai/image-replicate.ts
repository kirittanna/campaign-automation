import { experimental_generateImage as generateImage } from 'ai';
import { replicate } from '@ai-sdk/replicate';
import { ImageGenerationOptions } from './types';

export async function generate(options: ImageGenerationOptions) {
  try {
    const model = replicate.image('black-forest-labs/flux-schnell');

    const result = await generateImage({
      model,
      prompt: options.prompt,
      size: options.size,
      aspectRatio: options.aspectRatio,
      n: options.count,
      providerOptions: options.providerOptions,
    });

    return result;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}