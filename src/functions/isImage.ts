export default function isImagePath(name?: string, type?: string): boolean {
    return !!name?.match(/.(png|jpg|jpeg|svg|)$/) && !!type?.match(/image/i)
}