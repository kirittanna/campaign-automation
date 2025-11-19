export default function (
    product: string,
    description: string,
    audience: string,
    region: string,
    size: string = '2048x2048',
    ...additional: string[]
) {
    return `A high-resolution, studio-lit product photograph of ${product}, ${description} for ${audience} in ${region}. ${size} image. ${additional.join(' ')}`
}