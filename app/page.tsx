import CampaignList from "@/components/campaign-list";
import Upload from "@/components/file-upload";
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full items-center justify-between bg-white dark:bg-black">
        <section className="flex w-1/2 flex-col items-center justify-center">
          <Upload />
        </section>
        <Separator className="min-h-screen" orientation="vertical" />
        <section className="flex flex-col items-center justify-center w-1/2">
          <CampaignList />
        </section>
      </main>
    </div>
  );
}
