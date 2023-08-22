import { productData } from '@/types/dataTypes'
import {
    Alert, Chip, List,
    ListItem, Typography,
    alpha, useTheme, Box, capitalize
} from '@mui/material'
import { TrendingUp } from '@mui/icons-material'
import LoadingGrayBar from './LoadinGrayBar'
import { useQuery } from '@tanstack/react-query'
import CustomListItem, { DisplyProductDetails } from './CustomListItem'
import { numbersDecorator } from 'goni-functions'
import useStatisticsQueries from '@/hooks/useStatisticsQueries'
import useProductsDisplayer from '@/hooks/useProductsDisplayer'


export function LoadingState() {
    const { palette: { primary } } = useTheme();
    return (
        <ListItem sx={{ display: "flex", gap: 1, bgcolor: alpha(primary.main, .3), borderRadius: 1 }}>
            <LoadingGrayBar type="rou" w={50} h={50} />
            <LoadingGrayBar type="rou" w="100%" h={50} />
        </ListItem>
    )
}

export default function ProductsTopSales() {

    const { get_products_topSales } = useStatisticsQueries();
    const { display } = useProductsDisplayer();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["top-sales"],
        queryFn: () => get_products_topSales(5)
    })

    return (
        <>
            <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>Top Sales <TrendingUp color="primary" /></Typography>
            <List sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 1, overflowY: "auto", pt: 0 }}>
                {
                    isLoading ? [1, 2, 3].map(index => <LoadingState key={index} />) :
                        isError ? <Alert severity='error'>There is unexpected error</Alert>
                            :
                            data?.map((product: productData) => {
                                return (
                                    <CustomListItem
                                        key={product._id}
                                        title={product.title}
                                        subTitle={product.series}
                                        avatar={product.images?.[0]}
                                        avatarSx={{ borderRadius: "2px" }}
                                        onRightElement={<Chip label={`Sold: ${numbersDecorator(product.sold)}`} />}
                                        descriptionBox={
                                            <DisplyProductDetails
                                                description={product.description}
                                                price={product.price}
                                                category={product.category}
                                            />
                                        }
                                        actionButton={{ onClick() { display(product._id ?? "") }, label: "details" }}
                                    />
                                )
                            })
                }
            </List>
        </>
    )
}