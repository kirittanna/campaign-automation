import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
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
  locales: z.array(z.string()).default(['en-US']),
  
  // Optional compliance
  prohibitedWords: z.array(z.string()).optional()
});

export const CampaignMessageSchema = z.object({
  campaignId: z.string().uuid(),
  createdAt: z.string(),
  id: z.string().uuid(),
  locale: z.string(),
  message: z.string(),
});

export const CreativeSchema = z.object({
  id: z.string().uuid(),
  aspectRatio: z.string(),
  campaignId: z.string().uuid(),
  url: z.string(),
  metadata: z.string().optional(),
  createdAt: z.string(),
  name: z.string()
});

export const CampaignSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  brief: z.string(),
  ready: z.boolean().default(false),
  creatives: z.array(CreativeSchema),
  createdAt: z.string(),
  messages: z.array(CampaignMessageSchema),
  updatedAt: z.string(),
});

export type CampaignBrief = z.infer<typeof CampaignBriefSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type CampaignMessage = z.infer<typeof CampaignMessageSchema>;
export type Creative = z.infer<typeof CreativeSchema>;
export type Campaign = z.infer<typeof CampaignSchema>;