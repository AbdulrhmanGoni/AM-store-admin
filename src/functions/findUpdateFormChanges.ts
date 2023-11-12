import { productData } from "../types/dataTypes"
import { ProductformData } from "./getFormData"

export interface findTheChangesReturnType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

export default function findTheChanges(oldProductData: productData, newProductData: ProductformData): findTheChangesReturnType | null {

    const changes: findTheChangesReturnType = {};
    Object.keys(newProductData).forEach(field => {
        if (field === "files") {
            const thereIsChange =
                newProductData[field]?.some(item => item instanceof File) ||
                newProductData[field]?.length != oldProductData.images?.length;

            if (thereIsChange) changes[field] = newProductData[field];
        }
        else {
            if (oldProductData[field as keyof productData] !== newProductData[field as keyof ProductformData]) {
                changes[field] = newProductData[field as keyof ProductformData]
            }
        }
    })


    return Object.keys(changes).length ? changes : null
}