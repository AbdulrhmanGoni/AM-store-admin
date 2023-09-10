"use client"
import { Grid, Card } from "@mui/material";
import OrdersViewerTable from "./components/OrdersViewerTable"
// import SearchField from "./components/SearchForOrderField"
import TitleBarOfPage from "@/components/TitleBarOfPage";
import { FC } from "react";

const ProductsManagement: FC = function () {
    return (
        <>
            <TitleBarOfPage title="Orders Management" role="View and manage the orders" />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* <Card sx={{ p: 2, overflow: "visible" }}><SearchField /></Card> */}
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ p: 2 }}>
                        <OrdersViewerTable />
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default ProductsManagement