import host from "@/CONSTANT/API_hostName";
import useApiRequest from "./useApiRequest"

export default function useStatisticsQueries() {

    const { api } = useApiRequest();

    const path = (get: string, limit?: number): string => `${host}statistics/?get=${get}&limit=${limit ?? 3}`

    async function get_products_topSales(limit?: number) {
        return (await api.get(path("products-top-sales", limit))).data;
    }
    async function get_products_topEarnings(limit?: number) {
        return (await api.get(path("products-top-earnings", limit))).data;
    }
    async function getProductsOfOrder(productsIds: string[]) {
        return (await api.post(`${host}products?custom=title`, { productsIds, withCount: true, withPrice: true })).data
    }

    return {
        get_products_topSales,
        get_products_topEarnings,
        getProductsOfOrder
    }
}



