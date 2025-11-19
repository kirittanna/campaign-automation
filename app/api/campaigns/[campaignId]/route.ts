import type { NextRequest } from 'next/server'
import prisma from '@/lib/prisma';

export async function GET(_req: NextRequest, ctx: RouteContext<'/api/campaigns/[campaignId]'>) {
  const { campaignId } = await ctx.params
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
    include: { creatives: true, messages: true },
  });

  if (!campaign) {
    return new Response(JSON.stringify({ error: 'Campaign not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(campaign), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}