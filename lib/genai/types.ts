import { ImageModelV2, ProviderV2, SharedV2ProviderOptions } from '@ai-sdk/provider';

export type ImageSize = '1024x1024' | '1024x1792' | '1792x1024';

export type AspectRatio = '1:1' | '9:16' | '16:9';

export interface ImageGenerationOptions {
  count: number;
  prompt: string;
  size: ImageSize;
  aspectRatio: AspectRatio;
  providerOptions?: SharedV2ProviderOptions;
  seed?: number;
}

export interface TextGenerationOptions {
  prompt: string;
  providerOptions?: SharedV2ProviderOptions;
  system: string;
  temperature?: number;
}

export interface MessageGenerationOptions {
  campaignName: string;
  campaignMessage: string;
  products: string[];
  targetAudience: string;
  targetRegion: string;
  locales: string[];
}