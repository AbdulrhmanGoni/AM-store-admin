import { Alert, Chip, List, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import { AttachMoney } from '@mui/icons-material';
import { LoadingState } from './ProductsTopSales';
import CustomListItem, { DisplyProductDetails } from './CustomListItem';
import { nDecorator } from '@abdulrhmangoni/am-store-library'
import useStatisticsQueries from '@/hooks/useStatisticsQueries';
import useProductsDisplayer from '@/hooks/useProductsDisplayer';

interface productData {
    _id: string,
    title: string,
    description: string,
    images: string[],
    series: string,
    price: number,
    earnings: number,
    category: string,
}

export default function ProductsTopEarnings() {
    const { get_products_topEarnings } = useStatisticsQueries();
    const { display } = useProductsDisplayer();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["top-earnings"],
        queryFn: () => get_products_topEarnings(5)
    })

    return (
        <>
            <Typography variant="h6" sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 1, mb: 1 }}>
                Top Earnings <AttachMoney color="primary" />
            </Typography>
            <List sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 1, overflowY: "auto", pt: 0 }}>
                {
                    isLoading ? [1, 2, 3].map(index => <LoadingState key={index} />) :
                        isError ? <Alert severity='error'>There is unexpected error</Alert> :
                            data?.map((product: productData) => {
                                return (
                                    <CustomListItem
                                        key={product._id}
                                        title={product.title}
                                        subTitle={product.series}
                                        avatar={product.images?.[0]}
                                        avatarSx={{ borderRadius: "2px" }}
                                        onRightElement={<Chip label={`$${nDecorator(product.earnings?.toFixed(2))}`} />}
                                        descriptionBox={
                                            <DisplyProductDetails
                                                description={product.description}
                                                price={product.price}
                                                category={product.category}
                                            />
                                        }
                                        actionButton={{
                                            onClick: () => { display(product._id ?? ""); },
                                            label: "details"
                                        }}
                                    />
                                )
                            })
                }
            </List>
        </>
    )
}
