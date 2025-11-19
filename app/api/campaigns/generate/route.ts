import * as Langtrace from '@langtrase/typescript-sdk';
import * as ai from 'ai';
import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/lib/inngest/client";
import { CampaignBriefSchema } from "@/lib/schema";
import z from "zod";

// Opt out of caching; every request should send a new event
export const dynamic = "force-dynamic";

// Langtrace.init({
//     disable_latest_version_check: true,
//     instrumentations: {
//         ai
//     }, 
//     write_spans_to_console: false, 
// })

export async function POST(request: NextRequest) {
    console.log("Received request to generate campaign heros");
    const body = await request.json();
    console.log("Request body:", body);
    try {
        const brief = CampaignBriefSchema.parse(body);
        
        await inngest.send({
            name: "generate/campaign.heros",
            data: brief,
        });

        return NextResponse.json({ message: "Event sent!" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            NextResponse.json({ error }, { status: 400 });
        }
        return NextResponse.json({ error }, { status: 500 });
    }
}