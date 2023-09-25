import { host } from "@/CONSTANT/API_hostName";
import useApiRequest from "@/hooks/useApiRequest";
import { productData } from "@/types/dataTypes";

export default function useProductsActions() {

    const { api } = useApiRequest()

    const path = (type: string) => `${host}admin/products?type=${type}`;

    async function addNewProduct(theProduct: productData) {
        return (await api.post(path("add-new-product"), theProduct)).data
    }

    async function updateProduct(theProduct: productData) {
        return (await api.post(path("update-product"), { theProduct })).data
    }

    async function searchForProducts(searchInput: string) {
        return (await api.get(`${host}products?title=${searchInput}`)).data
    }

    return {
        addNewProduct,
        updateProduct,
        searchForProducts
    }
}

