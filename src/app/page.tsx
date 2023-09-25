"use client"
import { Box, Grid, Paper } from "@mui/material";
import EarningsChart from "@/components/EarningsChart";
import SalesGrowth from "@/components/SalesGrowth";
import AverageEarnings from "@/components/AverageEarnings";
import useGetApi from "@/hooks/useGetApi";


const boxSx = { width: "100%" }
const paperStyle = {
  display: "flex", p: 1,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}
export const pageSpaces = { xs: 1, md: 2 }

export default function SalesStatistics() {

  const path = "statistics/?get=monthly-statistics";
  const { data, isError, isLoading } = useGetApi({ key: ["statistics-earnings"], path });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: pageSpaces }}>
      <Grid container spacing={pageSpaces}>
        <Grid item xs={12} md={6.5} lg={8}>
          <Box sx={boxSx}>
            <Paper sx={paperStyle}>
              <EarningsChart data={data} />
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={5.5} lg={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: pageSpaces }}>
            <Paper sx={{ p: 1, height: "200px" }}>
              <SalesGrowth
                data={data}
                isError={isError}
                isLoading={isLoading}
              />
            </Paper>
            <Paper sx={{ p: 1, height: "200px" }}>
              <AverageEarnings
                data={data}
                isError={isError}
                isLoading={isLoading}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
