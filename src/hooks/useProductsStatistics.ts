import { PromiseState } from "@abdulrhmangoni/am-store-library"
import useGetApi from "./useGetApi"

export interface ProductsStatistics {
    totalProducts: number,
    totalInStock: number,
    productsOutOfStock: number,
    totalProductsSold: number,
    categoriesCount: number,
    seriesCount: number
}

const ProductsStatisticsDefault = {
    totalProducts: 0,
    totalInStock: 0,
    productsOutOfStock: 0,
    totalProductsSold: 0,
    categoriesCount: 0,
    seriesCount: 0
}

interface UseProductsStatisticsType extends PromiseState {
    productsStatistics: ProductsStatistics
}

export default function useProductsStatistics(): UseProductsStatisticsType {

    const queryKey = "products-statistics";
    const path = `statistics/?queryKey=${queryKey}`;
    const {
        data: productsStatistics = ProductsStatisticsDefault,
        isLoading,
        isError
    } = useGetApi<ProductsStatistics>({ key: [queryKey], path })

    return {
        isLoading,
        isError,
        productsStatistics
    }
}