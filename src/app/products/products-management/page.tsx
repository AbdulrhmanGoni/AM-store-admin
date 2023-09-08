"use client"
import { Grid, Card } from "@mui/material";
import ProductsWiewerTable from "../components/ProductsWiewerTable"
import SearchField from "../components/SearchField"
import TitleBarOfPage from "@/components/TitleBarOfPage";
import { FC } from "react";

const ProductsManagement: FC = function () {
  return (
    <>
      <TitleBarOfPage title="Products Management" role="Add, Update and Delete Products" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ p: 2, overflow: "visible" }}>
            <SearchField />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <ProductsWiewerTable />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default ProductsManagement