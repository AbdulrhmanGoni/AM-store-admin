import host from "@/CONSTANT/API_hostName";
import useApiRequest from "./useApiRequest"

export default function useStatisticsQueries() {

    const { api } = useApiRequest();
    async function getProductsOfOrder(productsIds: string[]) {
        return (await api.post(`${host}products?custom=title`, { productsIds, withCount: true, withPrice: true })).data
    }

    return {
        getProductsOfOrder
    }
}



