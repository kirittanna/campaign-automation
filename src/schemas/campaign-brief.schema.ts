import { z } from 'zod';

export const AspectRatioSchema = z.enum(['1:1', '9:16', '16:9']);

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional()
});

export const CampaignBriefSchema = z.object({
  campaignId: z.string().uuid().optional(),
  campaignName: z.string(),
  products: z.array(ProductSchema).min(2, 'At least 2 products required'),
  targetRegion: z.string(),
  targetAudience: z.string(),
  campaignMessage: z.string(),
  
  // Brand assets
  brandColors: z.array(z.string()).optional(),
  logo: z.string().optional(),
  
  // Generation config
  aspectRatios: z.array(AspectRatioSchema).default(['1:1', '9:16', '16:9']),
  locales: z.array(z.string()).default(['en-US']),
  
  // Optional compliance
  prohibitedWords: z.array(z.string()).optional()
});

export type CampaignBrief = z.infer<typeof CampaignBriefSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type AspectRatio = z.infer<typeof AspectRatioSchema>;
