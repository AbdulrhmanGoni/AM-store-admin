"use client"
import { Box, Grid, Paper, useMediaQuery } from "@mui/material";
import EarningsChart from "@/components/EarningsChart";
import OrdersStatisticsChart from "@/components/OrdersStatisticsChart";
import LatestOrders from "@/components/LatestOrders";
import SalesGrowth from "@/components/SalesGrowth";
import AverageOrders from "@/components/AverageOrders";
import AverageEarnings from "@/components/AverageEarnings";


const paperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  p: 1
}
const boxSx = { width: "100%" }

export default function AdminOverview() {

  const lgDevice = useMediaQuery("(min-width: 1560px)");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }}>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        <Grid item xs={12} md={6.5} lg={8}>
          <Box sx={boxSx}><Paper sx={paperStyle}><EarningsChart /></Paper></Box>
        </Grid>
        <Grid item xs={12} md={5.5} lg={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }}>
            <Paper sx={{ p: 1, height: "200px" }}><SalesGrowth /></Paper>
            <Paper sx={{ p: 1, height: "200px" }}><AverageEarnings /></Paper>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        <Grid item xs={12} md={5.5} lg={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }}>
            <Paper sx={{ p: 1, height: "200px" }}><AverageOrders /></Paper>
            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 }, height: "200px" }}>
              <Paper sx={{ flexBasis: "50%" }}></Paper>
              <Paper sx={{ flexBasis: "50%" }}></Paper>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6.5} lg={8}>
          <Box sx={boxSx}><Paper sx={paperStyle}><OrdersStatisticsChart /></Paper></Box>
        </Grid>
      </Grid>
    </Box>
  )
}

// export default function AdminOverview() {

//   const lgDevice = useMediaQuery("(min-width: 1560px)");

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }}>
//       <Grid container spacing={{ xs: 1, md: 2 }}>
//         <Grid item xs={12} sm={12} md={6} lg={lgDevice ? 3 : 6}>
//           <Paper sx={{ ...paperStyle, height: "200px" }}>
//             <SalesGrowth />
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={lgDevice ? 3 : 6}>
//           <Paper sx={{ ...paperStyle, height: "200px" }}>
//             <AverageOrders />
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={lgDevice ? 3 : 6}>
//           <Paper sx={{ ...paperStyle, height: "200px" }}>
//             <AverageEarnings />
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={lgDevice ? 3 : 6}>
//           <Paper sx={{ ...paperStyle, height: "200px" }}><CategoriesEarningsPercentages /></Paper>
//         </Grid>
//       </Grid>
//       <Grid container spacing={{ xs: 1, md: 2 }}>
//         <Grid item xs={12} sm={12} md={6} lg={6}>
//           <Box sx={{ ...boxSx, display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 }, height: "315px" }}>
//             <Paper sx={{ flexBasis: "33.3333%" }}>
//             </Paper>
//             <Paper sx={{ flexBasis: "33.3333%" }}>
//             </Paper>
//             <Paper sx={{ flexBasis: "33.3333%" }}>
//             </Paper>
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={6}>
//           <Box sx={boxSx}>
//             <Paper sx={paperStyle}>
//               <EarningsChart />
//             </Paper>
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={6}>
//           <Box sx={boxSx}>
//             <Paper sx={paperStyle}>
//               <OrdersStatisticsChart />
//             </Paper>
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={6}>
//           <Box sx={boxSx}>
//             <Paper sx={paperStyle}>
//               <CategoriesEarnings />
//             </Paper>
//           </Box>
//         </Grid>
//       </Grid>
//       <Grid container spacing={{ xs: 1, md: 2 }}>
//         <Grid item xs={12} md={6} lg={lgDevice ? 4 : 6}>
//           <Paper sx={{ p: 1 }}>
//             <ProductsTopSales />
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={6} lg={lgDevice ? 4 : 6}>
//           <Box sx={boxSx}>
//             <Paper sx={{ p: 1 }}>
//               <ProductsTopEarnings />
//             </Paper>
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={6} lg={lgDevice ? 4 : 6}>
//           <Paper sx={{ p: 1 }}>
//             <LatestOrders />
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   )
// }
