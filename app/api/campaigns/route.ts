import type { NextRequest } from 'next/server'
import prisma from '@/lib/prisma';

export async function GET(_request: NextRequest) {
  const campaigns = await prisma.campaign.findMany();

  return new Response(JSON.stringify(campaigns), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}