"use client"
import { Box, Grid, Paper, useMediaQuery } from "@mui/material";
import EarningsChart from "@/components/EarningsChart";
import SalesGrowth from "@/components/SalesGrowth";
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
    </Box>
  )
}
