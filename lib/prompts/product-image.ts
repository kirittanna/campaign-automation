export default function (
    product: string,
    description: string,
    audience: string,
    region: string,
    size: string = 'Square',
    ...additional: string[]
) {
    return `A high-resolution, studio-lit product photograph of ${product}, ${description} for ${audience} in ${region}. Solid or transparent background. Unobstructed view of the product without any other elements .${size} image. Style should be product-focused commercial photography with sharp detail and slight environmental context. ${additional.join(' ')}`
}