import isAnImage from "./isAnImage";

export interface ProductformData {
    title: string;
    price: number,
    series: string,
    category: string,
    files: (FormDataEntryValue | null)[],
    amount: number,
    description: string
}

export default function getFormData(formData: FormData): ProductformData {

    const files = [formData.get('image1'), formData.get('image2'), formData.get('image3'), formData.get('image4')]

    return {
        title: String(formData.get('title')),
        price: Number(formData.get('price')),
        files: files.filter((file) => isAnImage(file)),
        series: String(formData.get('series')),
        category: String(formData.get('category')),
        amount: Number(formData.get('amount')),
        description: String(formData.get('description'))
    };
}