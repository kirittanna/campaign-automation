# Campaign Automation

## Tech Stack
* Next.js App Router with Typescript
* ShadCN for UI components
* Vercel Blob Storage
* Vercel Storage - Prisma PostGres
* Vercel AI-SDK
* Prisma ORM
* Inngest
* Ngrok (Required for Vercel Blob integration)
* Vercel for Deployments

## Pre-requisites
Clone the repo and setup a project in Vercel that uses the Next.js template and the repo.
- Configure Storage for Prisma PostGres
- Configure Blob Storage

## Getting Started - Development

### Setup the project on Vercel and add the following environment variables
* BLOB_READ_WRITE_TOKEN=<FETCHED_WITH_VERCEL_CLI>
* DATABASE_URL
* OPENAI_API_KEY
* POSTGRES_URL
* PRISMA_DATABASE_URL
* REPLICATE_API_TOKEN
* VERCEL_OIDC_TOKEN
* VERCEL_BLOB_CALLBACK_URL=<THIS_IS_THE_NGROK_ADDRESS>

First, install dependencies
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Additionally, do the following:
Start Ngrok -
```bash
npm run ngrok
```

Start Inngest -
```bash
npm run inngest
```

Setup Prisma DB
```bash
npx prisma db push
```

Optionally, run Prisma Studio
```bash
npm run prisma
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## How to test
- To create a new campaign, uploading a manifest and/or product images
- Once files are added for uploading, click **Generate Campaign**
- You will see am item queued with _your campaign name_ in the right-hand side panel, click on it.
- You will be navigated to a campaign view which will automatically update with the hero images, message & translations, product images and any other relevant information based on what you've configured.

## Sample Manifest
```json
{
  "campaignName": "Winter Warmth Collection 2025",
  "products": [
    {
      "id": "prod-001",
      "name": "Thermal Puffer Jacket",
      "description": "Insulated puffer jacket with windproof shell and fleece-lined interior"
    },
    {
      "id": "prod-002",
      "name": "Wool Knit Beanie",
      "description": "Soft ribbed wool beanie offering warmth and comfort for cold days"
    }
  ],
  "targetRegion": "North America & Europe",
  "targetAudience": "Men 20-35, winter commuters, outdoor lifestyle",
  "campaignMessage": "Stay Warm. Stay Stylish.",
  "brandColors": ["#1E3A8A", "#93C5FD", "#F8FAFC"],
  "locales": ["en-US", "en-GB", "de-DE"]
}
```

## GenAI info
### Models used via Replicate
- Generate product assets - black-forest-labs/flux-schnell
- Generate hero images with multiple input images - google/nano-banana
- Generate campaign message in multiple locales - o3

### Other Models on Replicate
#### Multiple inputs
- openai/gpt-5.1
- bytedance/seedream-4
- flux-kontext-apps/multi-image-kontext-pro
- flux-kontext-apps/multi-image-list
#### Image generation
- bytedance/seedream-4
#### Resize
- luma/reframe-image
#### Background removal
- 851-labs/background-remover:a029dff38972b5fda4ec5d75d7d1cd25aeff621d2cf4946a41055d7db66b80bc

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Docs](https://nextjs.org/docs)
- [Inngest Docs](https://www.inngest.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma PostGres](https://www.prisma.io/postgres)
- [AI-SDK Docs](https://ai-sdk.dev/docs)
- [Vercel Blob Docs](https://vercel.com/docs/vercel-blob)
- [Vercel Blob Docs](https://vercel.com/docs/vercel-blob)
- [ShadCN Docs](https://ui.shadcn.com/docs/installation)
- [React Dropzone](https://react-dropzone.js.org/)

### Additional notes

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.