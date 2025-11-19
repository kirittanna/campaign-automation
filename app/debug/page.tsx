'use client';

import campaignMessagePrompt from '@/lib/core/generate-message';
import { useEffect, useState } from 'react';

export default function Debug() {
    const [messages, setMessages] = useState<Array<unknown> | undefined>();

    useEffect(() => {
        const loadData = async () => {
            const response =await campaignMessagePrompt({
                campaignName: "Summer Fashion Collection 2025",
                products: ["Linen Summer Dress", "Casual Beach Shorts"],
                targetRegion: "North America",
                targetAudience: "Women 25-40, fashion-conscious, urban professionals",
                campaignMessage: "Embrace Summer Elegance",
                locales: ["en-US", "es-ES"]
            })

            console.log("Generated messages:", response);
            if(response?.data.messages) {
                setMessages(response.data.messages);
            }
        }

        loadData();
    }, [])

    return (
        <div className="flex min-w-full min-h-screen bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-col dark:bg-black">
                <section className="flex flex-col">
                    <h1 className="text-2xl font-bold">Debug</h1>
                    <p>Use this page to debug your application.</p>
                </section>
                <section className="flex flex-col">
                    <h2 className="text-xl font-bold">Generated Messages</h2>
                    <div className="flex flex-col gap-4 mt-4">
                        {messages?.map((message, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-md">
                                <pre>{JSON.stringify(message, null, 2)}</pre>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}