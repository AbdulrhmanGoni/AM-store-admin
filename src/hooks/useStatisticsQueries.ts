import host from "@/CONSTANT/API_hostName";
import useApiRequest from "./useApiRequest"

export default function useStatisticsQueries() {

    const { api } = useApiRequest();

    const path = (get: string, limit?: number): string => `${host}statistics/?get=${get}&limit=${limit ?? 3}`

    async function get_products_topSales(limit) {
        return (await api.get(path("products-top-sales", limit))).data;
    }
    async function get_products_topEarnings(limit) {
        return (await api.get(path("products-top-earnings", limit))).data;
    }
    async function statistics_categories() {
        return (await api.get(path("categories-earnings&return=totalEarnings,date,category"))).data;
    }
    async function statistics_earnings() {
        return (await api.get(path("statistics-history&return=totalEarnings,date"))).data;
    }
    async function statistics_orders() {
        return (await api.get(path("statistics-history&return=totalOrders,date"))).data;
    }
    async function get_latestOrders(limit) {
        return (await api.get(path("orders-get-latest", limit))).data;
    }
    async function getProductsOfOrder(productsIds) {
        return (await api.post(`${host}products?custom=title`, { productsIds, withCount: true, withPrice: true })).data
    }

    return {
        get_products_topSales,
        get_products_topEarnings,
        statistics_categories,
        statistics_earnings,
        statistics_orders,
        get_latestOrders,
        getProductsOfOrder
    }
}



