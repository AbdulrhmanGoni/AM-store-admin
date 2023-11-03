import useMonthlyCategoriesStatistics from "./useMonthlyCategoriesStatistics";
import useCategoriesStatistics, { CategoryStatistics } from "./useCategoriesStatistics";
import useGetApi from "./useGetApi";
import { useMemo } from "react";


export default function useProductsStatisticsPageContent() {

    const {
        isLoading: chartLoading,
        isError: chartError,
        chartData: { earningsChartData, totalEarnings }
    } = useMonthlyCategoriesStatistics();

    const {
        data: productsStatistics,
        isLoading: productsStatisticsLoading,
        isError: productsStatisticsError
    } = useCategoriesStatistics();

    const { data: topProducts, isLoading: topProductsLoading, isError: topProductsError } = useGetApi({
        key: ["top-products"], path: "statistics/?get=top-products&limit=5"
    })
    const { data: topSerieses, isLoading: topSeriesesLoading, isError: topSeriesesError } = useGetApi({
        key: ["top-serieses"], path: "statistics/?get=top-serieses&limit=5"
    })

    const productsTotals = useMemo(() => {
        return prepareProductsStatistics(productsStatistics)
    }, [productsStatistics])

    const topCategoriesData = useMemo(() => {
        return prepareTopCategoriesData(productsStatistics)
    }, [productsStatistics])

    return {
        earningsChartData,
        chartLoading,
        chartError,
        totalEarnings,
        topCategoriesData,
        productsTotals,
        productsStatisticsLoading,
        productsStatisticsError,
        topSerieses,
        topSeriesesLoading,
        topSeriesesError,
        topProducts,
        topProductsLoading,
        topProductsError,
    }
}


function prepareProductsStatistics(response?: CategoryStatistics[]) {
    const productsStatistics = response?.reduce((acc, curr) => {
        acc.productsCount += curr.productsCount
        acc.inStock += curr.inStock
        acc.productsSold += curr.productsSold
        acc.totalEarnings += curr.totalEarnings
        return acc
    }, { productsCount: 0, inStock: 0, productsSold: 0, totalEarnings: 0 })

    return {
        totalProducts: productsStatistics?.productsCount,
        totalInStock: productsStatistics?.inStock,
        totalProductsSold: productsStatistics?.productsSold,
        totalProductsEarnings: productsStatistics?.totalEarnings,
        categoriesCount: response?.length
    }
}
function prepareTopCategoriesData(response?: CategoryStatistics[]) {
    const
        categories: string[] = [],
        values: number[] = []
    response?.forEach((cat) => {
        categories.push(cat.category)
        values.push(cat.productsSold)
    })

    return { categories, values }
}