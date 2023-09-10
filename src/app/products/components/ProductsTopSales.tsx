import {
    Alert, Chip, List,
    ListItem, Typography,
    alpha, useTheme, Box
} from '@mui/material'
import { TrendingUp } from '@mui/icons-material'
import LoadingGrayBar from '@/components/LoadinGrayBar'
import { useQuery } from '@tanstack/react-query'
import CustomListItem, { DisplyProductDetails } from '@/components/CustomListItem'
import { nDecorator } from '@abdulrhmangoni/am-store-library'
import useStatisticsQueries from '@/hooks/useStatisticsQueries'
import useProductsDisplayer from '@/hooks/useProductsDisplayer'
import randomColorsArr from '@/CONSTANT/randomColorsArr'

interface productData {
    _id: string,
    title: string,
    description: string,
    images: string[],
    series: string,
    price: number,
    sold: number,
    category: string,
}

export function LoadingState() {
    const { palette: { primary } } = useTheme();
    return (
        <ListItem sx={{ display: "flex", gap: 1, bgcolor: alpha(primary.main, .3), borderRadius: 1 }}>
            <LoadingGrayBar type="rou" w={50} h={50} />
            <LoadingGrayBar type="rou" w="100%" h={50} />
        </ListItem>
    )
}

type ListTitleProps = {
    title: string,
    subTitle: string,
    color?: string
    icon?: any
}
export function ListTitle({ title, subTitle, color, icon }: ListTitleProps) {
    const theColor = color || randomColorsArr[0];
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 1.5, width: "100%", mb: 1.5 }}>
            <Box
                component="div"
                className='flex-center'
                sx={{
                    p: "5px",
                    border: `solid 1px ${theColor}`,
                    borderRadius: "5px",
                    bgcolor: alpha(theColor, .5)
                }}
            >
                {icon ?? <TrendingUp sx={{ fill: "white" }} />}
            </Box>
            <Box>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2">{subTitle}</Typography>
            </Box>
        </Box>
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
            <ListTitle
                title="Top selling"
                subTitle="The top products that sold"
                icon={<TrendingUp />}
            />
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
                                        onRightElement={<Chip label={`Sold: ${nDecorator(product.sold)}`} />}
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