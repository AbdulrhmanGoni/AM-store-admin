import { useMemo } from "react"
import randomColorsArr from "../CONSTANTS/randomColorsArr"
import useYearStatistics from "./useYearStatistics"

interface MonthlyCategoryStatistics {
    month: string
    productsSold: number
    totalEarnings: number
}

interface CategoriesStatisticsType {
    category: string,
    monthlyStatistics: MonthlyCategoryStatistics[]
}

export default function useMonthlyCategoriesStatistics() {

    const queryOptions = { dataPropertyName: "categories" }
    const queryKey = "monthly-categories-statistics"
    const {
        data,
        currentYear,
        setYear,
        isLoading,
        isError
    } = useYearStatistics<CategoriesStatisticsType[]>(queryKey, queryOptions)

    const chartData = useMemo(() => {
        let total: number = 0;
        const
            earningsChartData: ApexAxisChartSeries = [],
            salesChartData: ApexAxisChartSeries = []

        data?.forEach(({ category, monthlyStatistics }: CategoriesStatisticsType, index: number) => {
            earningsChartData.push({
                name: category,
                color: randomColorsArr[index],
                data: monthlyStatistics?.map((month: MonthlyCategoryStatistics) => {
                    const totalEarnings = month.totalEarnings
                    total += totalEarnings;
                    return +totalEarnings.toFixed(2);
                })
            })
            salesChartData.push({
                name: category,
                color: randomColorsArr[index],
                data: monthlyStatistics?.map((month: MonthlyCategoryStatistics) => month.productsSold)
            })
        })

        return {
            earningsChartData,
            salesChartData,
            totalEarnings: total
        }
    }, [data])

    return {
        chartData,
        currentYear,
        setYear,
        isLoading,
        isError
    }
}
