import { faker } from "@faker-js/faker";
import useMonthlySalesStatistics, { MonthSalesStatistics } from "./useMonthlySalesStatistics";
import useGetApi from "./useGetApi";

interface OrdersStatisticsType {
    ordersCount: number,
    currentYearOrders: number,
    completedOrders: number,
    pendingOrders: number,
    canceledOrders: number
}

const defaultStatistics = {
    ordersCount: 0,
    currentYearOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    canceledOrders: 0
}

export default function useOrdersPageContent() {

    const {
        data: ordersStatistics = defaultStatistics,
        isLoading: statisticsAreLoading
    } = useGetApi<OrdersStatisticsType>({
        path: "statistics?get=orders-statistics",
        key: ["orders-statistics"]
    });
    const { monthesData } = useMonthlySalesStatistics();

    let totalOrders: number = 0;
    const dataChart: number[] = monthesData?.map((doc: MonthSalesStatistics) => {
        const randomNimber = faker.number.float({ precision: 1, max: 50, min: 30 });
        const orders = doc.totalOrders ? doc.totalOrders : randomNimber;
        totalOrders += orders;
        return orders;
    }) ?? [0]

    return {
        dataChart,
        totalOrders,
        ordersStatistics,
        statisticsAreLoading
    }
}
