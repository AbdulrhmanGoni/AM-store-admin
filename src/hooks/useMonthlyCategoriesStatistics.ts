import { useMemo, useState } from "react"
import useGetApi from "./useGetApi"
import randomColorsArr from "../CONSTANTS/randomColorsArr"
import { faker } from "@faker-js/faker"
import { PromiseState } from "@abdulrhmangoni/am-store-library"


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
    chartData: {
        earningsChartData: ApexAxisChartSeries,
        salesChartData: ApexAxisChartSeries,
        totalEarnings: number
    },
    year?: number,
    setYear: (year: number) => void
}

interface reaponseType {
    categories: CategoriesStatisticsType[],
    year: number
}

export default function useMonthlyCategoriesStatistics(): UseMonthlyCategoriesStatisticsType {

    const [year, setYear] = useState<number>(new Date().getFullYear())
    const queryKey = "monthly-categories-statistics"
    const { data, isError, isLoading } = useGetApi<reaponseType>({
        key: [queryKey, year], path: `statistics/?get=${queryKey}&year=${year}`
    })

    const chartData = useMemo(() => {
        let total: number = 0;
        const
            earningsChartData: ApexAxisChartSeries = [],
            salesChartData: ApexAxisChartSeries = []

        data?.categories.forEach(({ category, monthlyStatistics }: CategoriesStatisticsType, index: number) => {
            earningsChartData.push({
                name: category,
                color: randomColorsArr[index],
                data: monthlyStatistics?.map((month: MonthlyCategoryStatistics) => {
                    const randomEarnings = faker.number.float({ precision: 0.02, max: 3000, min: 1500 });
                    const totalEarnings = month.totalEarnings ? month.totalEarnings : randomEarnings;
                    total += totalEarnings;
                    return +totalEarnings.toFixed(2);
                })
            })
            salesChartData.push({
                name: category,
                color: randomColorsArr[index],
                data: monthlyStatistics?.map((month: MonthlyCategoryStatistics) => {
                    const randomNumber = faker.number.float({ precision: 1, max: 45, min: 30 });
                    return month.productsSold ? month.productsSold : randomNumber
                })
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
        year: data?.year,
        setYear,
        isLoading,
        isError
    }
}
