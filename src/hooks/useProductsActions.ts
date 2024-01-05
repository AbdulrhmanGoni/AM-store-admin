import { host_admin } from "../CONSTANTS/API_hostName";
import useApiRequest from "./useApiRequest";
import { productData } from "../types/dataTypes";
import { findTheChangesReturnType } from "../functions/findUpdateFormChanges";
import { GenericAbortSignal } from "axios";

export default function useProductsActions() {

    const { api } = useApiRequest();

    const path = (type: string) => `${host_admin}/products?type=${type}`;

    async function addNewProduct(theProduct: productData) {
        return (await api.post(path("add-new-product"), theProduct)).data
    }

    async function updateProduct(changes: findTheChangesReturnType, productId: string) {
        return (await api.post(`${host_admin}/products/${productId}`, { changes })).data
    }

    async function getProduct(productId: string, signal?: GenericAbortSignal) {
        return (await api.get(`${host_admin}/products/${productId}`, { signal })).data
    }

    async function deleteProduct(productId: string) {
        return (await api.delete(`${host_admin}/products/${productId}`, { data: productId })).data
    }

    async function addDiscountToProducts(productsIds: (string | number)[], discount: number) {
        return (await api.post(`${host_admin}/products/discounts`, { productsIds, discount })).data
    }

    async function removeDiscountFromProducts(productsIds: (string | number)[]) {
        return (await api.delete(`${host_admin}/products/discounts`, { data: { productsIds } })).data
    }

    return {
        addNewProduct,
        updateProduct,
        getProduct,
        deleteProduct,
        addDiscountToProducts,
        removeDiscountFromProducts
    }
}