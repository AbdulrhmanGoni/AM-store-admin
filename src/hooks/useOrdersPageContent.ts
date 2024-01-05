import useMonthlySalesStatistics, { MonthSalesStatistics } from "./useMonthlySalesStatistics";
import useOrdersStatistics from "./useOrdersStatistics";

export default function useOrdersPageContent() {

    const {
        data: ordersStatistics,
        setYear: setOrdersStatisticsYear,
        isLoading: statisticsAreLoading
    } = useOrdersStatistics();

    const {
        data: monthesData,
        currentYear,
        setYear: setMonthlySalesYear,
        isLoading: chartDataLoading,
        isError: chartDataError,
        refetch: refetchChartData
    } = useMonthlySalesStatistics()

    const chartData: number[] = monthesData?.map((doc: MonthSalesStatistics) => doc.totalOrders) ?? [0]

    return {
        chartData,
        currentYear,
        setYear: (year: number) => {
            setMonthlySalesYear(year)
            setOrdersStatisticsYear(year)
        },
        ordersStatistics,
        statisticsAreLoading,
        chartDataLoading,
        chartDataError,
        refetchChartData
    }
}
