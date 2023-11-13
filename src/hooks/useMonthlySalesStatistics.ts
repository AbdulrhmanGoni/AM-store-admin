import { PromiseState } from "@abdulrhmangoni/am-store-library";
import useGetApi from "./useGetApi";
import { useState } from "react";

export interface MonthSalesStatistics {
    month: string,
    totalEarnings: number,
    totalOrders: number,
    productsSold: number,
    earningsTarget: number
}

interface reaponseType {
    monthes: MonthSalesStatistics[],
    year: number
}

export interface UseMonthlySalesStatisticsType extends PromiseState {
    monthesData?: MonthSalesStatistics[],
    year: number,
    setYear: (year: number) => void
}
export default function useMonthlySalesStatistics(): UseMonthlySalesStatisticsType {

    const [year, setYear] = useState<number>(new Date().getFullYear())
    const query = "monthly-sales-statistics"
    const path = `statistics/?get=${query}&year=${year}`;
    const {
        data,
        isError,
        isLoading
    } = useGetApi<reaponseType>({ key: [query, year], path });

    return {
        monthesData: data?.monthes,
        year: data?.year ?? year,
        setYear,
        isLoading,
        isError
    }
}
