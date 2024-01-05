import useYearStatistics from "./useYearStatistics";

export interface MonthSalesStatistics {
    month: string,
    totalEarnings: number,
    totalOrders: number,
    productsSold: number,
    earningsTarget: number
}

export default function useMonthlySalesStatistics() {
    const options = { dataPropertyName: "monthes" }
    return useYearStatistics<MonthSalesStatistics[]>("monthly-sales-statistics", options);
}
