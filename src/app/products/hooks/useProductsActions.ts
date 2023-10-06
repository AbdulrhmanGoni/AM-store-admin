import { host_admin, host } from "@/CONSTANT/API_hostName";
import useApiRequest from "@/hooks/useApiRequest";
import { productData } from "@/types/dataTypes";
import { findTheChangesReturnType } from "../functions/findUpdateFormChanges";

export default function useProductsActions() {

    const { api } = useApiRequest()

    const path = (type: string) => `${host_admin}products?type=${type}`;

    async function addNewProduct(theProduct: productData) {
        return (await api.post(path("add-new-product"), theProduct)).data
    }

    async function updateProduct(changes: findTheChangesReturnType, productId: string) {
        return (await api.post(`${host_admin}products/${productId}`, { changes, productId })).data
    }

    async function searchForProducts(searchInput: string) {
        return (await api.get(`${host}products?title=${searchInput}`)).data
    }

    async function getProduct(productId: string) {
        return (await api.get(`${host_admin}products/${productId}`)).data
    }

    async function deleteProduct(productId: string) {
        return (await api.delete(`${host_admin}products/${productId}`, { data: productId })).data
    }

    return {
        addNewProduct,
        updateProduct,
        getProduct,
        searchForProducts,
        deleteProduct
    }
}