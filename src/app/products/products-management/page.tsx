"use client"
import { FC } from "react";
import { Grid, Card } from "@mui/material";
import ProductsViewerTable from "../components/ProductsViewerTable"
import TitleBarOfPage from "@/components/TitleBarOfPage";
import useProductsDisplayer from '@/hooks/useProductsDisplayer';
import { ReadMore } from "@mui/icons-material";
import { SearchForProductsField } from "@abdulrhmangoni/am-store-library";

const ProductsManagement: FC = function () {

  const { display } = useProductsDisplayer();

  return (
    <>
      <TitleBarOfPage title="Products Management" role="Add, Update and Delete Products" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ p: 2, overflow: "visible" }}>
            <SearchForProductsField
              actionWithProductId={(id) => display(id)}
              endItemIcon={<ReadMore />}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <ProductsViewerTable />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default ProductsManagement