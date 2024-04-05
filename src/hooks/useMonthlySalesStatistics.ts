import { useQueryClient } from "@tanstack/react-query";
import useYearStatistics from "./useYearStatistics";

export interface MonthSalesStatistics {
    month: string,
    totalEarnings: number,
    totalOrders: number,
    productsSold: number,
    earningsTarget: number
}

type UpdateMonthlySalesStatisticsFn = (statisticsDoc: MonthSalesStatistics[]) => MonthSalesStatistics[]

export default function useMonthlySalesStatistics() {

    const options = { dataPropertyName: "monthes" }
    const queryKey = "monthly-sales-statistics"
    const statistics = useYearStatistics<MonthSalesStatistics[]>(queryKey, options);

    const queryClient = useQueryClient()

    function updateMonthlySalesStatistics(year: number, updateFn: UpdateMonthlySalesStatisticsFn) {
        queryClient.setQueryData<{ monthes: MonthSalesStatistics[] }>([queryKey, year], (data) => {
            return data?.monthes && { monthes: updateFn(data.monthes) }
        })
    }

    return {
        ...statistics,
        updateMonthlySalesStatistics
    }
}
