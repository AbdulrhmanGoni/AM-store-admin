import { GridRowsProp } from "@mui/x-data-grid"
import useGetApi from "./useGetApi"
import columns from "../components/orders-page-components/OrdersGridColumnsConfig"
import useEventSource from "./useEventSource"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import notificationSound from "../functions/notificationSound"

interface LatestOrdersType {
    totalPrice: number,
    products: string[],
    state: string,
    expectedDeliveryDate: string,
    deliveryPrice: number,
    createdAt: string,
    userData: GridRowsProp
}

export default function useLatestOrders() {

    const query = "latest-orders"
    const { data: orders = [], isLoading } = useGetApi<readonly LatestOrdersType[]>({
        key: [query],
        path: `orders/${query}?limit=10`
    })
    const queryClient = useQueryClient()

    const latestOrders = useEventSource("orders/watch-orders");

    function handleNewOrder(event: MessageEvent<string>) {
        if (event.data) {
            queryClient.setQueryData<readonly LatestOrdersType[]>([query], (state) => {
                return [JSON.parse(event.data) as LatestOrdersType, ...state!]
            })
            notificationSound()
        }
    }

    useEffect(() => {
        const eventSource = latestOrders();
        eventSource.addEventListener("message", handleNewOrder)
    }, [])

    return {
        orders,
        columns,
        isLoading
    }
}
