import { host } from "@/CONSTANT/API_hostName";
import useApiRequest from "@/hooks/useApiRequest";
import { productData } from "@/types/dataTypes";

export default function useAsyncActions() {

    const { api } = useApiRequest()

    const path = (type: string) => `${host}admin/products?type=${type}`;

    async function addNewProducts(theProduct: FormData) {
        return (await api.post(path("add-new-product"), theProduct)).data
    }

    async function updateProducts(theProduct: productData) {
        return (await api.post(path("update-product"), { theProduct })).data
    }

    async function searchForProducts(searchInput: string) {
        return (await api.get(`${host}products?title=${searchInput}`)).data
    }
    return {
        addNewProducts,
        updateProducts,
        searchForProducts
    }
}

