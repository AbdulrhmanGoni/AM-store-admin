import { productData } from "@/types/dataTypes"
import { ProductformData } from "./getFormData"

export interface findTheChangesReturnType {
    title?: string;
    price?: number,
    series?: string,
    category?: string,
    files?: (FormDataEntryValue | string)[],
    amount?: number,
    description?: string
}

export default function findTheChanges(oldProductData: productData, newProductData: ProductformData): findTheChangesReturnType {

    let changes = {};
    Object.keys(newProductData).forEach(field => {
        if (field === "files") {
            let thereIsChange =
                newProductData[field]?.some(item => item instanceof File) ||
                newProductData[field]?.length != oldProductData.images?.length

            if (thereIsChange) {
                changes[field] = newProductData[field]
            }
        } else {
            if (oldProductData[field] !== newProductData[field]) {
                changes[field] = newProductData[field]
            }
        }
    })

    return changes
}