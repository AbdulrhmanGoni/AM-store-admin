"use client"
import { FC } from "react";
import { Grid, Card } from "@mui/material";
import ProductsViewerTable from "../components/ProductsViewerTable"
import PageTitle from "@/components/PageTitle";
import useProductsDisplayer from '@/hooks/useProductsDisplayer';
import { ReadMore } from "@mui/icons-material";
import { SearchForProductsField } from "@abdulrhmangoni/am-store-library";
import SvgIcon from "@/components/SvgIcon";
import { productsManagementIcon } from "@/components/svgIconsAsString";

const ProductsManagement: FC = function () {

  const { display } = useProductsDisplayer();

  return (
    <>
      <PageTitle
        title="Products Management"
        descreption="Add, Update and Delete Products"
        icon={<SvgIcon svgElementAsString={productsManagementIcon} />}
      />
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