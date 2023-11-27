import useGetApi from "./useGetApi";
import useProductsStatistics from "./useProductsStatistics";

export interface ProductData {
    _id: string,
    title: string,
    description: string,
    images: string[],
    series: string,
    price: number,
    sold: number,
    earnings: number,
    category: string,
}

interface TopProductsType {
    topEarnings: ProductData[],
    topSales: ProductData[]
}

export default function useProductsStatisticsPageContent() {

    const {
        productsStatistics,
        isLoading: productsStatisticsLoading,
        isError: productsStatisticsError
    } = useProductsStatistics();

    const {
        data: topProducts,
        isLoading: topProductsLoading,
        isError: topProductsError
    } = useGetApi<TopProductsType>({ key: ["top-products"], path: "statistics/?get=top-products&limit=5" })

    return {
        productsStatistics,
        productsStatisticsLoading,
        productsStatisticsError,
        topProducts,
        topProductsLoading,
        topProductsError,
    }
}