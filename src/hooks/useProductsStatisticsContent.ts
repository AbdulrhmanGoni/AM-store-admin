import randomColorsArr from "../CONSTANTS/randomColorsArr";
import useGetApi from "./useGetApi";
import { faker } from "@faker-js/faker";
import { useMemo } from "react";

type MonthProps = {
    totalEarnings: number,
    productsSold: number
}

export default function useProductsStatisticsContent() {

    const { data: categoriesStatistics, isError: chartError, isLoading: chartLoading, } = useGetApi({
        key: ["categories-statistics"], path: 'statistics/?get=categories-statistics'
    })
    const { data: productsStatistics, isLoading: productsStatisticsLoading, isError: productsStatisticsError } = useGetApi({
        key: ["products-statistics"], path: "statistics/?get=products-statistics"
    })
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


    let total: number = 0;
    const earningsChartData = Object.keys(categoriesStatistics ?? {}).map((category, index) => {
        return {
            name: category,
            color: randomColorsArr[index],
            data: categoriesStatistics[category]?.map((month: MonthProps) => {
                const randomEarnings = faker.number.float({ precision: 0.02, max: 3000, min: 1500 });
                const totalEarnings = month.totalEarnings ? month.totalEarnings : randomEarnings;
                total += totalEarnings;
                return +totalEarnings.toFixed(2);
            }) ?? [0]
        }
    })

    return {
        earningsChartData,
        chartLoading,
        chartError,
        topCategoriesData,
        totalEarnings: total,
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

interface ProductsStatisticsResponse {
    inStock: number
    productsCount: number
    productsSold: number
    totalEarnings: number
    _id: string
}

function prepareProductsStatistics(response?: ProductsStatisticsResponse[]) {
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
function prepareTopCategoriesData(response?: ProductsStatisticsResponse[]) {
    const
        categories: string[] = [],
        values: number[] = []
    response?.forEach((cat) => {
        categories.push(cat._id)
        values.push(cat.productsSold)
    })

    return { categories, values }
}