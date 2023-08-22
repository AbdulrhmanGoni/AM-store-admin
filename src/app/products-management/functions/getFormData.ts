import { productData, submetEvent } from "@/types/dataTypes";

export default function getFormData(event: submetEvent): productData {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [title, price, series, category, image, amount, description]: any = [
        data.get('title'),
        Number(data.get('price')),
        data.get('series'),
        data.get('category'),
        data.get('image'),
        Number(data.get('amount')),
        data.get('description'),
    ];
    return { title, price, series, category, image, amount, description };
}