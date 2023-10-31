import { Grid, Card, Box } from "@mui/material";
import ProductsViewerTable from "../components/products-pages/ProductsViewerTable"
import PageTitle from "../components/PageTitle";
import useProductsDisplayer from '../hooks/useProductsDisplayer';
import { ReadMore } from "@mui/icons-material";
import { SearchForProductsField } from "@abdulrhmangoni/am-store-library";
import SvgIcon from "../components/SvgIcon";
import { productsManagementIcon } from "../components/svgIconsAsString";
import host from "../CONSTANTS/API_hostName";
import pageSpaces from "../CONSTANTS/pageSpaces";


export default function ProductsManagementPage() {

  const { display } = useProductsDisplayer();

  return (
    <Box className="flex-column" gap={pageSpaces}>
      <PageTitle
        title="Products Management"
        description="Add, Update and Delete Products"
        icon={<SvgIcon disableIconColor svgElementAsString={productsManagementIcon} />}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ p: 2, overflow: "visible" }}>
            <SearchForProductsField
              hostName={host}
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
    </Box>
  )
}