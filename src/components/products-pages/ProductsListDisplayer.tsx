import { Alert, List } from "@mui/material";
import useProductsDisplayer from "../../hooks/useProductsDisplayer";
import CustomListItem, { DisplyProductDetails } from "../CustomListItem";
import ProductsListLoadingState from "./ProductsListLoadingState";
import { FetchFailedAlert, PromiseState } from "@abdulrhmangoni/am-store-library";
import { ProductData } from "./TopProductsContainer";

interface ProductsListDisplayerProps extends PromiseState {
    onRightElement: (product: ProductData) => JSX.Element
    productsList?: ProductData[],
    refetch?: () => void
}

export default function ProductsListDisplayer({ productsList, isError, isLoading, onRightElement, refetch }: ProductsListDisplayerProps) {
    const { display } = useProductsDisplayer();
    return (
        <List
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1, pt: 0,
                width: "100%",
                minHeight: "200px",
                overflowY: "auto"
            }}
        >
            {
                isLoading ? <ProductsListLoadingState length={5} /> :
                    isError ? <FetchFailedAlert message="There is unexpected error" refetch={refetch} />
                        : productsList?.length ? productsList.map((product: ProductData) => {
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
                        }) : !isError && <Alert severity="info" className="flex-row-center" sx={{ flex: 1 }}>No Products</Alert>
            }
        </List>
    )
}
