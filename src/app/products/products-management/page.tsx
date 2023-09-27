"use client"
import { Grid, Card } from "@mui/material";
import ProductsViewerTable from "../components/ProductsViewerTable"
import SearchField from "../components/SearchField"
import TitleBarOfPage from "@/components/TitleBarOfPage";
import { FC } from "react";
import useProductsDisplayer from '@/hooks/useProductsDisplayer';
import { ReadMore } from "@mui/icons-material";

const ProductsManagement: FC = function () {

  const { display } = useProductsDisplayer();

  return (
    <>
      <TitleBarOfPage title="Products Management" role="Add, Update and Delete Products" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ p: 2, overflow: "visible" }}>
            <SearchField
              actionWithProductId={(id) => display(id)}
              itemIcon={<ReadMore />}
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