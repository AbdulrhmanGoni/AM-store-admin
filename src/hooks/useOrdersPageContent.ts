import useMonthlySalesStatistics, { MonthSalesStatistics } from "./useMonthlySalesStatistics";
import useGetApi from "./useGetApi";

interface OrdersStatisticsType {
    totalOrders: number,
    completedOrders: number,
    pendingOrders: number,
    canceledOrders: number
}

const defaultStatistics = {
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    canceledOrders: 0
}

export default function useOrdersPageContent() {

    const {
        monthesData,
        year,
        isLoading: chartDataLoading,
        isError: chartDataError,
        refetch: refetchChartData
    } = useMonthlySalesStatistics();
    const {
        data: ordersStatistics = defaultStatistics,
        isFetching: statisticsAreLoading
    } = useGetApi<OrdersStatisticsType>({
        path: `statistics?queryKey=orders-statistics&year=${year}`,
        key: ["orders-statistics", year]
    });

    const chartData: number[] = monthesData?.map((doc: MonthSalesStatistics) => doc.totalOrders) ?? [0]

    return {
        chartData,
        year,
        ordersStatistics,
        statisticsAreLoading,
        chartDataLoading,
        chartDataError,
        refetchChartData
    }
}
