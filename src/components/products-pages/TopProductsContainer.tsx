import { Grid, Paper } from "@mui/material";
import ProductsTopSales from "./ProductsTopSales";
import ProductsTopEarnings from "./ProductsTopEarnings";
import useGetApi from "../../hooks/useGetApi";

export interface ProductData {
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

interface TopProductsType {
    topEarnings: ProductData[],
    topSales: ProductData[]
}

export default function TopProductsContainer() {

    const queryKey = "top-products"
    const {
        data: topProducts,
        isLoading: topProductsLoading,
        isError: topProductsError
    } = useGetApi<TopProductsType>({ key: [queryKey], path: `statistics/?queryKey=${queryKey}&limit=5` })

    return (
        <>
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 1 }}>
                    <ProductsTopSales
                        isLoading={topProductsLoading}
                        isError={topProductsError}
                        productsList={topProducts?.topSales}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 1 }}>
                    <ProductsTopEarnings
                        isLoading={topProductsLoading}
                        isError={topProductsError}
                        productsList={topProducts?.topEarnings}
                    />
                </Paper>
            </Grid>
        </>
    )
}
