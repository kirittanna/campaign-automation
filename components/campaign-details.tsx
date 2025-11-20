import useSWR from 'swr'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Spinner } from '@/components/ui/spinner';
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Campaign } from '@/lib/schema';
import { fetcher } from '@/lib/utils';
import Link from 'next/link';
import { IconHome } from '@tabler/icons-react';

export default function CampaignDetails({ id }: { id: string }) {
    const { data: campaign, error, isLoading } = useSWR<Campaign>(`/api/campaigns/${id}`, fetcher, {
        refreshInterval: 10000,
    })

    if (error || !campaign || !campaign?.id) {
        return (
            <div className="flex flex-col p-4 gap-4">
            <h2 className="text-2xl font-bold">Not Found!</h2>
            <Link className="flex gap-1" href="/"><IconHome /> Home</Link>
            </div>
        )
    }
    if (isLoading) return <Spinner />

    return (
        <div className="flex flex-col p-4 gap-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Campaign</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h2 className="text-2xl font-bold">{campaign?.name} {!campaign?.ready ? <Spinner /> : null}</h2>
            <h3 className="text-lg font-medium">Messages</h3>
            <div className="flex flex-col gap-4">
                <ul className="list-disc pl-4">
                    {campaign?.messages.map((m, index) => (
                        <li key={m.id}>
                            <strong>{m.locale}:</strong> {m.message}
                        </li>
                    ))}
                </ul>
            </div>
            <h3 className="text-lg font-medium">Hero Images</h3>
            <div className="flex gap-4 [--radius:1rem]">
                {campaign?.creatives.filter(c => {
                    const metadata = JSON.parse(c.metadata as string)
                    return metadata.type === 'hero'
                }).map((creative) => (
                    <Card className="w-full max-w-2xl flex flex-col" key={creative.id}>
                        <CardHeader>
                            <CardTitle><h2>{creative.aspectRatio}</h2></CardTitle>
                            <CardDescription>

                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <AspectRatio className="rounded-lg" ratio={9 / 16}>
                                    <img src={creative.url} alt={creative.aspectRatio} className="rounded-md object-cover max-h-fit" />
                                </AspectRatio>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <ul>
                                <li>{new Intl.DateTimeFormat("en-US", {
                                    dateStyle: "full",
                                    timeStyle: "long",
                                }).format(Date.parse(creative.createdAt))}</li>
                            </ul>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <h3 className="text-lg font-medium">Products</h3>
            <div className="flex gap-2 mt-4">
                {campaign?.creatives.filter(c => {
                    const metadata = JSON.parse(c.metadata as string)
                    return metadata.type === 'product'
                }).map((creative) => (
                    <img key={creative.id} src={creative.url} alt={creative.aspectRatio} className="max-w-xs rounded-md object-cover max-h-fit" />
                ))}
            </div>
        </div>
    )
}