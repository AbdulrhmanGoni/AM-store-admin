import useProductsStatistics from "./useProductsStatistics";

export default function useProductsStatisticsPageContent() {

    const {
        productsStatistics,
        isLoading: productsStatisticsLoading,
        isError: productsStatisticsError
    } = useProductsStatistics();

    return {
        productsStatistics,
        productsStatisticsLoading,
        productsStatisticsError
    }
}