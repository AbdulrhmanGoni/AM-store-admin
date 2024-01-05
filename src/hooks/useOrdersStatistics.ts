import useYearStatistics from "./useYearStatistics";

interface OrdersStatistics {
    totalOrders: number,
    completedOrders: number,
    pendingOrders: number,
    canceledOrders: number
}

const defaultStatistics = {
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    canceledOrders: 0
}

export default function useOrdersStatistics() {
    const options = { dataPropertyName: "statistics" }
    const results = useYearStatistics<OrdersStatistics>("orders-statistics", options);
    if (!results.data) results.data = defaultStatistics
    return results
}
