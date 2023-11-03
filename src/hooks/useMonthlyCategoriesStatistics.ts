import { useMemo } from "react"
import useGetApi from "./useGetApi"
import randomColorsArr from "../CONSTANTS/randomColorsArr"
import { faker } from "@faker-js/faker"
import { PromiseState } from "@abdulrhmangoni/am-store-library"


export interface chartObtions { color: string, name: string }
export interface chartCategory extends chartObtions { data: number[] }

export interface MonthlyCategoryStatistics {
    month: string
    productsSold: number
    totalEarnings: number
}

interface CategoriesStatisticsType {
    category: string,
    monthlyStatistics: MonthlyCategoryStatistics[]
}

interface UseMonthlyCategoriesStatisticsType extends PromiseState {
    data: CategoriesStatisticsType[],
    chartData: {
        earningsChartData: chartCategory[],
        totalEarnings: number
    }
}

export default function useMonthlyCategoriesStatistics(): UseMonthlyCategoriesStatisticsType {

    const queryKey = "monthly-categories-statistics"
    const { data = [], isError, isLoading } = useGetApi({
        key: [queryKey], path: `statistics/?get=${queryKey}`
    })

    const chartData = useMemo(() => {
        let total: number = 0;
        return {
            earningsChartData: data.map(({ category, monthlyStatistics }: CategoriesStatisticsType, index: number) => {
                return {
                    name: category,
                    color: randomColorsArr[index],
                    data: monthlyStatistics?.map((month: MonthlyCategoryStatistics) => {
                        const randomEarnings = faker.number.float({ precision: 0.02, max: 3000, min: 1500 });
                        const totalEarnings = month.totalEarnings ? month.totalEarnings : randomEarnings;
                        total += totalEarnings;
                        return +totalEarnings.toFixed(2);
                    })
                }
            }),
            totalEarnings: total
        }
    }, [data])

    return {
        data,
        chartData,
        isLoading,
        isError
    }
}
