import { PromiseState } from "@abdulrhmangoni/am-store-library"
import useGetApi from "./useGetApi"

export interface CategoryStatistics {
    inStock: number,
    productsCount: number,
    productsSold: number,
    totalEarnings: number,
    category: string
}

interface UseCategoriesStatisticsType extends PromiseState {
    data: CategoryStatistics[]
}

export default function useCategoriesStatistics(): UseCategoriesStatisticsType {

    const queryKey = "categories-statistics"
    const { data = [], isLoading, isError } = useGetApi({
        key: [queryKey], path: `statistics/?get=${queryKey}`
    })

    return {
        isLoading,
        isError,
        data
    }
}