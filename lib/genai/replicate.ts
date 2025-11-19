import Replicate, { type Prediction } from 'replicate';
import { ImageGenerationOptions } from './types';

export async function generate(options: ImageGenerationOptions) {
  try {
    const replicate = new Replicate();
    
    function onProgress(prediction: Prediction) {
        console.log({ prediction });
    }

    const result = await replicate.run('black-forest-labs/flux-schnell', { input: { prompt: options.prompt } }, onProgress)

    return result;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}