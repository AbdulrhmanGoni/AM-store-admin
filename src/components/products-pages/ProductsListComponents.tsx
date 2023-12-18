import {
    Alert, List,
    ListItem,
    alpha, useTheme, Box, Skeleton
} from '@mui/material'
import useProductsDisplayer from '../../hooks/useProductsDisplayer'
import CustomListItem, { DisplyProductDetails } from '../CustomListItem'
import SmallIconBox from '../SmallIconBox'
import { PromiseState, P } from '@abdulrhmangoni/am-store-library'
import { ProductData } from '../../hooks/useProductsStatisticsPageContent'


export interface TopProductsList extends PromiseState {
    productsList?: ProductData[]
}
interface ProductsListDisplayerProps extends TopProductsList {
    onRightElement: (product: ProductData) => JSX.Element
}
type ListTitleProps = {
    title: string,
    subTitle: string,
    color?: string
    icon: JSX.Element | string | number
}

export function ProductsListDisplayer({ productsList, isError, isLoading, onRightElement }: ProductsListDisplayerProps) {
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
                        productsList?.map((product: ProductData) => {
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
    return (
        <Box sx={{ width: "100%", p: "0px 10px 10px" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 1 }}>
                <P variant="h6">{title}</P>
                <SmallIconBox
                    icon={icon}
                    color={color}
                    svgIconSize={20}
                    boxStyle={{ p: "2px" }}
                />
            </Box>
            <P variant="body2">{subTitle}</P>
        </Box >
    )
}
export function LoadingState() {
    const { palette: { primary } } = useTheme();
    return (
        <ListItem sx={{ display: "flex", gap: 1, bgcolor: alpha(primary.main, .3), borderRadius: 1 }}>
            <Skeleton variant="rounded" width={50} height={48} />
            <Skeleton variant="rounded" width="100%" height={48} />
        </ListItem>
    )
}