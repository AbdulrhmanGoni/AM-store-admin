import { PromiseState } from "@abdulrhmangoni/am-store-library"
import useGetApi from "./useGetApi"

export interface CategoryStatistics {
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
    const { data = [], isLoading, isError } = useGetApi<CategoryStatistics[]>({
        key: [queryKey], path: `statistics/?queryKey=${queryKey}`
    })

    return {
        isLoading,
        isError,
        data
    }
}