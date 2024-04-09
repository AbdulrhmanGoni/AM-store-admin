import host, { host_admin } from "../CONSTANTS/API_hostName";
import useApiRequest from "./useApiRequest";
import { productData } from "../types/dataTypes";
import { findTheChangesReturnType } from "../functions/findUpdateFormChanges";
import { GenericAbortSignal } from "axios";

export type PaginateProductsModel = { pageSize: number, page: number, categories: string[] }

export default function useProductsActions() {

    const { api } = useApiRequest();

    const path = (additionalPath: string = "") => `${host_admin}/products/${additionalPath}`;

    async function addNewProduct(theProduct: productData) {
        return (await api.post(path(""), theProduct)).data
    }

    async function updateProduct(changes: findTheChangesReturnType, productId: string) {
        return (await api.patch(path(productId), { changes })).data
    }

    async function getProduct(productId: string, signal?: GenericAbortSignal) {
        return (await api.get(path(productId), { signal })).data
    }

    async function paginateProducts({ pageSize, page, categories }: PaginateProductsModel) {
        const returnType = "_rate,_comments,_updatedAt,_createdAt"
        const query = `pageSize=${pageSize}&page=${++page}&returnType=${returnType}&categories=${categories.join(",")}`
        return (await api.get(`${host}/products/pagination?${query}`)).data
    }

    async function deleteProduct(productId: string) {
        return (await api.delete(path(), { data: { productsIds: [productId] } })).data
    }

    async function addDiscountToProducts(productsIds: (string | number)[], discount: number) {
        return (await api.post(path("discounts"), { productsIds, discount })).data
    }

    async function removeDiscountFromProducts(productsIds: (string | number)[]) {
        return (await api.delete(path("discounts"), { data: { productsIds } })).data
    }

    return {
        addNewProduct,
        updateProduct,
        getProduct,
        paginateProducts,
        deleteProduct,
        addDiscountToProducts,
        removeDiscountFromProducts
    }
}