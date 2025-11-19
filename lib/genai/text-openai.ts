import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { TextGenerationOptions } from './types';
import z from 'zod';

export default async function(options: TextGenerationOptions) {
  try {
    const model = openai('o3');
    const result = await generateObject({
      model,
      prompt: options.prompt,
      system: options.system,
      schema: z.object({
        messages: z.array(
          z.object({
            locale: z.string().describe('The locale that determines the language and region (en-US, nl-NL, etc.).'),
            message: z.string().describe('The campaign message.'),
          })
        ).describe('List of generated campaign messages and the respective locale.')
      })
    });

    return {
      data: result.object,
      result,
    };
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
}