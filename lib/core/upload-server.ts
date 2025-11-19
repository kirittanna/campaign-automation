export default async function(name: string, body: File | Blob, options: Record<string, unknown>) {
    try {
        const response = await fetch(`http://localhost:3000/api/upload/server?filename=${name}`, {
            method: 'POST',
            body
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to upload image');
        }

        return data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}