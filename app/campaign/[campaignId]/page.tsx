'use client'

import { useParams } from 'next/navigation'

import CampaignDetails from '@/components/campaign-details';
 
export default function CampaignPage() {
  const params = useParams<{ campaignId: string; }>()
  
  return (
    <CampaignDetails id={params.campaignId} />
  )
}