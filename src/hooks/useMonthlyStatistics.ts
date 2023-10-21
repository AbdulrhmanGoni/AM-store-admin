import { PromiseState } from "@abdulrhmangoni/am-store-library";
import useGetApi from "./useGetApi";

export interface MonthStatistics {
    month: string,
    totalEarnings: number,
    totalOrders: number,
    productsSold: number,
    earningsTarget: number
}

export interface MonthlyStatistics extends PromiseState {
    monthesData?: MonthStatistics[]
}
export default function useMonthlyStatistics(): MonthlyStatistics {

    const query = "monthly-statistics"
    const path = `statistics/?get=${query}`;
    const { data, isError, isLoading } = useGetApi({ key: [query], path });

    return {
        monthesData: data,
        isLoading,
        isError
    }
}
