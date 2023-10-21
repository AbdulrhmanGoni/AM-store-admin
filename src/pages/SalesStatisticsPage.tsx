import { Box, Grid, Paper } from "@mui/material";
import EarningsChart from "../components/sales-statistics-page/EarningsChart";
import SalesGrowth from "../components/sales-statistics-page/SalesGrowth";
import SvgIcon from "../components/SvgIcon";
import MonthlyTargets from "../components/sales-statistics-page/MonthlyTargets";
import CardInfoWithChart from "../components/CardInfoWithChart";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { faker } from "@faker-js/faker";
import { SmalLine } from "../components/SmallChart";
import { averageOrdersIcon } from "../components/svgIconsAsString";
import DisplayInfoBox from "../components/DisplayInfoBox";
import moneyIcon from "../components/moneyIcon";
import randomColorsArr from "../CONSTANT/randomColorsArr";
import useMonthlyStatistics, { MonthStatistics } from "../hooks/useMonthlyStatistics";
import pageSpaces from "../CONSTANT/pageSpaces";


const boxSx = { width: "100%" }
const paperStyle = {
  display: "flex", p: 1,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}


export default function SalesStatisticsPage() {

  const { monthesData, isLoading, isError } = useMonthlyStatistics();

  const monthlyEarnings: number[] = monthesData?.map((mon: MonthStatistics) => {
    const randomNimber = faker.number.float({ precision: 0.01, max: 5000, min: 4000 });
    return mon.totalEarnings ? mon.totalEarnings : randomNimber
  }) ?? [0];

  const totalEarnings: number = monthlyEarnings?.reduce((acc, cur) => acc + cur, 0);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: pageSpaces }}>
      <Grid container spacing={pageSpaces}>
        <Grid item xs={12} md={4.5}>
          <MonthlyTargets
            isLoading={isLoading}
            monthesData={monthesData}
          />
        </Grid>
        <Grid item xs={12} sm={7.5} md={4.5}>
          <Paper sx={{ p: 1, height: "200px" }}>
            <SalesGrowth
              monthesData={monthesData}
              isError={isError}
              isLoading={isLoading}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4.5} md={3}>
          <DisplayInfoBox
            type="columnly"
            title="Total Earnings"
            isLoading={isLoading}
            body={`$${nDecorator(totalEarnings?.toFixed(2))}`}
            bodyColor="success.main"
            icon={<SvgIcon svgElementAsString={moneyIcon} />}
            color={randomColorsArr[1]}
            BoxStyle={{ height: "100%", p: 2 }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={pageSpaces}>
        <Grid item xs={12} sm={7.5} lg={8}>
          <Box sx={boxSx}>
            <Paper sx={paperStyle}>
              <EarningsChart monthesData={monthesData} />
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4.5} lg={4}>
          <CardInfoWithChart
            isLoading={isLoading}
            theChart={<SmalLine width={200} data={monthlyEarnings} tooltipIsMony />}
            icon={<SvgIcon svgElementAsString={averageOrdersIcon} />}
            title="Average Earnings"
            description="per month"
            mainValue={monthesData ? `$${nDecorator((totalEarnings / (monthesData.length)).toFixed(2))}` : ""}
          />
        </Grid>
      </Grid>
    </Box>
  )
}