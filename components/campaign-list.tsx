'use client'
import {
    Item,
    ItemActions,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import Link from "next/link"
import useSWR from "swr"
import { Spinner } from "@/components/ui/spinner"
import { fetcher } from "@/lib/utils"
import { Campaign } from "@/lib/schema"
import { IconBrandCampaignmonitor, IconCheck, IconChevronRight } from "@tabler/icons-react"

const CampaignList = () => {
    const { data, error, isLoading } = useSWR<Campaign[]>(`/api/campaigns`, fetcher, {
        refreshInterval: 5000,
    })

    if (error || (!isLoading && data?.length === 0)) return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconBrandCampaignmonitor />
                </EmptyMedia>
                <EmptyTitle>No Campaigns Yet</EmptyTitle>
                <EmptyDescription>
                    You haven&apos;t created any projects yet. Get started by creating
                    your first campaign.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
    if (isLoading) return <Spinner />
    return (
        <div className="flex w-full max-w-md flex-col gap-4 overflow-y-auto [--radius:1rem]">
            {data?.map(c => (
                <Link href={`/campaign/${c.id}`} key={c.id}>
                    <Item variant="outline">
                        <ItemMedia>
                            {!c.ready ? <Spinner /> : <IconCheck className="text-green-500" />}
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle className="line-clamp-1">{c.name}</ItemTitle>
                        </ItemContent>
                        <ItemActions>
                            <IconChevronRight />
                        </ItemActions>
                    </Item>
                </Link>
            ))}
        </div>
    )
}

export default CampaignList