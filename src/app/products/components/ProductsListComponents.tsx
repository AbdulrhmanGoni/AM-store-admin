import {
    Alert, List,
    ListItem, Typography,
    alpha, useTheme, Box
} from '@mui/material'
import LoadingGrayBar from '@/components/LoadinGrayBar'
import randomColorsArr from '@/CONSTANT/randomColorsArr'
import useProductsDisplayer from '@/hooks/useProductsDisplayer'
import CustomListItem, { DisplyProductDetails } from '@/components/CustomListItem'

interface productData {
    _id: string,
    title: string,
    description: string,
    images: string[],
    series: string,
    price: number,
    sold: number,
    earnings: number,
    category: string,
}
type ProductsListDisplayerProps = {
    data: productData[]
    isLoading?: boolean
    isError?: boolean,
    onRightElement: (product: productData) => any
}
type ListTitleProps = {
    title: string,
    subTitle: string,
    color?: string
    icon: any
}

export function ProductsListDisplayer({ data, isError, isLoading, onRightElement }: ProductsListDisplayerProps) {
    const { display } = useProductsDisplayer();
    return (
        <List
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1, pt: 0,
                width: "100%",
                height: "360px",
                overflowY: "auto",
            }}
        >
            {
                isLoading ? [1, 2, 3, 4, 5].map(index => <LoadingState key={index} />) :
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
                                    onRightElement={onRightElement(product)}
                                    actionButton={{ onClick() { display(product._id ?? "") }, label: "details" }}
                                    descriptionBox={
                                        <DisplyProductDetails
                                            description={product.description}
                                            price={product.price}
                                            category={product.category}
                                        />
                                    }
                                />
                            )
                        })
            }
        </List>
    )
}
export function ListTitle({ title, subTitle, color, icon }: ListTitleProps) {
    const theColor = color || randomColorsArr[0];
    return (
        <Box sx={{ width: "100%", p: "0px 10px 10px" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 1 }}>
                <Typography variant="h6">{title}</Typography>
                <Box
                    component="div"
                    className='flex-center'
                    sx={{
                        p: "2px",
                        border: `solid 1px ${theColor}`,
                        borderRadius: "5px",
                        bgcolor: alpha(theColor, .5),
                        "& svg": { width: "0.8em", height: "0.8em" }
                    }}
                >
                    {icon}
                </Box>
            </Box>
            <Typography variant="body2">{subTitle}</Typography>
        </Box>
    )
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