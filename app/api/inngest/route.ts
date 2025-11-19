import { inngest } from "@/lib/inngest/client";
import generateCampaignHeros from "@/lib/inngest/functions/generate-campaign-heros";
import helloWorld from "@/lib/inngest/functions/hello-world";
import { serve } from "inngest/next";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    generateCampaignHeros,
  ],
});