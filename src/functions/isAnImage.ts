export default function isAnImage(file: FormDataEntryValue | null): boolean {
    if (file instanceof File) {
        return !!file.name?.match(/.(png|jpg|jpeg|svg|)$/) && !!file.type?.match(/image/i)
    } else if (typeof file === "string") {
        return !!file?.match(/.(png|jpg|jpeg|svg|)$/) && !!file?.match(/http/i)
    } else return false
}