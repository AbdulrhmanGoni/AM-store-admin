import randomColorsArr from "@/CONSTANT/randomColorsArr";
import useGetApi from "@/hooks/useGetApi";
import { faker } from "@faker-js/faker";
import { chartCategory } from "../components/CategoriesEarningsPercentages";
import { TopCategoriesCartData } from "../components/TopCategories";
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


    let total: number = 0;
    let earningsChartData: chartCategory[] = [];
    let productsSoldChartData: TopCategoriesCartData = { categories: [], values: [] };

    Object.keys(categoriesStatistics ?? {}).forEach((category, index) => {
        let thisCatsold: number = 0;
        earningsChartData.push({
            name: category,
            color: randomColorsArr[index],
            data: categoriesStatistics[category]?.map((month: MonthProps) => {
                let randomEarnings = faker.number.float({ precision: 0.02, max: 3000, min: 1500 });
                let randomSold = faker.number.float({ precision: 1, max: 20, min: 15 });
                thisCatsold += month.productsSold ? month.productsSold : randomSold;
                let totalEarnings = month.totalEarnings ? month.totalEarnings : randomEarnings;
                total += totalEarnings;
                return +totalEarnings.toFixed(2);
            }) ?? [0]
        })
        productsSoldChartData.values.push(thisCatsold)
        productsSoldChartData.categories.push(category)
    })

    return {
        earningsChartData,
        chartLoading,
        chartError,
        productsSoldChartData,
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
    })

    return {
        totalProducts: productsStatistics?.productsCount,
        totalInStock: productsStatistics?.inStock,
        totalProductsSold: productsStatistics?.productsSold,
        totalProductsEarnings: productsStatistics?.totalEarnings
    }
}