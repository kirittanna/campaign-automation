export default function (
    mood: string,
    campaign: string,
    message: string,
    background: string,
    typography: string,
    colors: string[],
    products: string[],
    audience: string,
    region: string,
    size: string = '2048x2048',
    ...additional: string[]
) {
    return `Create a vibrant social media hero image that is ${mood} for ${campaign}, featuring ${products.join(',')} for ${audience} in ${region}, and the campaign message “${message}” where the background is ${background} that leaves space in the for text overlay. The composition includes a fashion model, the brand logo, dynamic product and campaign message placement. The overall design should align with the brand's typography styles using ${typography}, the color palette should include ${colors.join(',')} and identity. Size: ${size}. Eye catching, engaging, and shareable. ${additional.join(' ')}`
} 