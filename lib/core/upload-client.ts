import { upload } from '@vercel/blob/client';

export default async function(name: string, body: File | Blob, options: Record<string, unknown>) {
    try {
        return await upload(name, body, {
            access: 'public',
            handleUploadUrl: '/api/upload/client',
            clientPayload: JSON.stringify(options),
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}