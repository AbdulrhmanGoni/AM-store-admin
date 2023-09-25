export default function isAnImage(file: FormDataEntryValue | null): boolean {
    if (file instanceof File) {
        return !!file.name?.match(/.(png|jpg|jpeg|svg|)$/) && !!file.type?.match(/image/i)
    } else return false
}