import { faker } from "@faker-js/faker";
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

    const { monthesData, year } = useMonthlySalesStatistics();
    const {
        data: ordersStatistics = defaultStatistics,
        isLoading: statisticsAreLoading
    } = useGetApi<OrdersStatisticsType>({
        path: `statistics?get=orders-statistics&year=${year}`,
        key: ["orders-statistics", year]
    });

    const dataChart: number[] = monthesData?.map((doc: MonthSalesStatistics) => {
        const randomNimber = faker.number.float({ precision: 1, max: 50, min: 30 });
        const orders = doc.totalOrders ? doc.totalOrders : randomNimber;
        return orders;
    }) ?? [0]

    return {
        dataChart,
        year,
        ordersStatistics,
        statisticsAreLoading
    }
}
