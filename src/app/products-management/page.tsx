"use client"
import { Grid, Card } from "@mui/material";
import AddProductForm from "./components/AddProductForm"
import ProductsWiewerTable from "./components/ProductsWiewerTable"
import SearchField from "./components/SearchField"
import TitleBarOfPage from "@/components/TitleBarOfPage";


export default function ProductsManagement() {
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
        <Grid item xs={12}>
          <Card>
            <AddProductForm />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

