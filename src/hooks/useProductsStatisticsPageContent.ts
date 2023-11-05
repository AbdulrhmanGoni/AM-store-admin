import useMonthlyCategoriesStatistics from "./useMonthlyCategoriesStatistics";
import useCategoriesStatistics, { CategoryStatistics } from "./useCategoriesStatistics";
import useGetApi from "./useGetApi";
import { useMemo } from "react";


export default function useProductsStatisticsPageContent() {

    const {
        chartData: { earningsChartData }
    } = useMonthlyCategoriesStatistics();

    const {
        data: categoriesStatistics,
        isLoading: productsStatisticsLoading,
        isError: productsStatisticsError
    } = useCategoriesStatistics();

    const { data: topProducts, isLoading: topProductsLoading, isError: topProductsError } = useGetApi({
        key: ["top-products"], path: "statistics/?get=top-products&limit=5"
    })
    const { data: topSerieses, isLoading: topSeriesesLoading, isError: topSeriesesError } = useGetApi({
        key: ["top-serieses"], path: "statistics/?get=top-serieses&limit=5"
    })

    const productsStatistics = useMemo(() => {
        return prepareProductsStatistics(categoriesStatistics)
    }, [categoriesStatistics])

    const topCategoriesData = useMemo(() => {
        return prepareTopCategoriesData(categoriesStatistics)
    }, [categoriesStatistics])

    return {
        earningsChartData,
        topCategoriesData,
        productsStatistics,
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

    const initaiResult = {
        productsCount: 0,
        inStock: 0,
        outOfStock: 0,
        productsSold: 0,
        totalEarnings: 0,
        serieses: Array<string>()
    }

    const categoriesStatistics = response?.reduce((acc, curr) => {
        acc.productsCount += curr.productsCount
        acc.inStock += curr.inStock
        acc.outOfStock += curr.outOfStock
        acc.productsSold += curr.productsSold
        acc.totalEarnings += curr.totalEarnings
        acc.serieses = acc.serieses.concat(curr.serieses)
        return acc
    }, initaiResult)

    return {
        totalProducts: categoriesStatistics?.productsCount,
        totalInStock: categoriesStatistics?.inStock,
        productsOutOfStock: categoriesStatistics?.outOfStock,
        totalProductsSold: categoriesStatistics?.productsSold,
        totalProductsEarnings: categoriesStatistics?.totalEarnings,
        seriesesCount: new Set(categoriesStatistics?.serieses).size,
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