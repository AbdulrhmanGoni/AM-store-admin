import { PromiseState } from "@abdulrhmangoni/am-store-library";
import useGetApi from "./useGetApi";

export interface MonthSalesStatistics {
    month: string,
    totalEarnings: number,
    totalOrders: number,
    productsSold: number,
    earningsTarget: number
}

export interface UseMonthlySalesStatisticsType extends PromiseState {
    monthesData?: MonthSalesStatistics[]
}
export default function useMonthlySalesStatistics(): UseMonthlySalesStatisticsType {

    const query = "monthly-sales-statistics"
    const path = `statistics/?get=${query}`;
    const { data, isError, isLoading } = useGetApi<MonthSalesStatistics[]>({ key: [query], path });

    return {
        monthesData: data,
        isLoading,
        isError
    }
}
