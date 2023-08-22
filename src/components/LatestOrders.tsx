import { order } from '@/types/dataTypes'
import { Alert, Box, Chip, LinearProgress, List, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { timeAgo } from 'goni-functions'
import { LoadingState } from './ProductsTopSales'
import CustomListItem from './CustomListItem'
import SmallTable from './SmallTable'
import { AirportShuttle } from '@mui/icons-material'
import useStatisticsQueries from '@/hooks/useStatisticsQueries'

function OrdersItem(props: { order: order }) {
    const { order } = props;
    const { getProductsOfOrder } = useStatisticsQueries()
    const { data, isLoading, isError } = useQuery({
        queryKey: ["latest-orders", order._id],
        queryFn: () => getProductsOfOrder(order.products)
    })

    const descriptionBox = <>
        <Box sx={{ display: "flex", gap: 1, justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" gutterBottom component="div">Products</Typography>
            <Chip icon={<AirportShuttle />} label={`$${order.deliveryPrice.value}`} />
        </Box>
        <SmallTable theProducts={data} />
    </>

    return (
        <CustomListItem
            title={order.userData?.userName || "unknown"}
            subTitle={order.userData?.userEmail}
            avatar={order.userData?.avatar}
            onRightElement={<Chip label={`Total: $${(order.totalPrice.after).toFixed(2)}`} />}
            note={timeAgo(order.createdAt)}
            descriptionBox={
                isLoading ? <LinearProgress /> :
                    isError ? <Alert severity='error' >Something Went Wrong</Alert> :
                        data ? descriptionBox :
                            <Alert severity='error' >Something Went Wrong</Alert>
            }
        />
    )
}

export default function LatestOrders() {
    
    const { get_latestOrders } = useStatisticsQueries()
    const { data, isLoading, isError } = useQuery({
        queryKey: ["latest-orders"],
        queryFn: () => get_latestOrders(5)
    })

    return (
        <>
            <Typography sx={{ mb: 1 }} variant="h6">Latest Orders</Typography>
            <List sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 1, overflowY: "auto", pt: 0 }}>
                {
                    isLoading ? [1, 2, 3].map(index => <LoadingState key={index} />) :
                        isError ? <Alert severity='error'>There is unexpected error</Alert>
                            : data.length ?
                                data.map((order: order) => <OrdersItem key={order._id} order={order} />)
                                : <Alert severity='warning'>No Orderds</Alert>
                }
            </List>
        </>
    )
}
