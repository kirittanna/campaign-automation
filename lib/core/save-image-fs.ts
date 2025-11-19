import writeFile from '@/lib/core/write-file';
import path from 'node:path';

const BASE_DIR = path.resolve(process.cwd(), 'public');
// console.log("Base directory for images:", BASE_DIR);

export default function(campaignId: string, name: string, image: any) {
    const fileExtension = image.mediaType.split('/').pop();
    const filename = path.resolve(BASE_DIR, String(campaignId), `${name}.${fileExtension}`);
    try {
        writeFile(filename, image.uint8Array);
        console.log("Saved image", filename);
    } catch(e: unknown) {
        console.error('Error saving image!', e)
    }
}