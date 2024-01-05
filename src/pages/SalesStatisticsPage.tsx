import { Box, Grid, Paper } from "@mui/material";
import MonthlyEarningsChart from "../components/sales-statistics-page/MonthlyEarningsChart";
import SalesGrowth from "../components/sales-statistics-page/SalesGrowth";
import SvgIcon from "../components/SvgIcon";
import MonthlyTargets from "../components/sales-statistics-page/MonthlyTargets";
import CardInfoWithChart from "../components/CardInfoWithChart";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { SmalLine } from "../components/SmallChart";
import { averageOrdersIcon } from "../components/svgIconsAsString";
import DisplayInfoBox from "../components/DisplayInfoBox";
import moneyIcon from "../components/moneyIcon";
import randomColorsArr from "../CONSTANTS/randomColorsArr";
import useMonthlySalesStatistics, { MonthSalesStatistics } from "../hooks/useMonthlySalesStatistics";
import pageSpaces from "../CONSTANTS/pageSpaces";
import PageTitle from "../components/PageTitle";
import SelectBox from "../components/SelectBox";
import yearsArray from "../functions/yearsArray";

export default function SalesStatisticsPage() {

  const {
    data: monthesData,
    isLoading,
    currentYear,
    setYear,
    refetch
  } = useMonthlySalesStatistics();

  const monthlyEarnings: number[] = monthesData?.map((mon: MonthSalesStatistics) => mon.totalEarnings) ?? [0];

  const totalEarnings: number = monthlyEarnings?.reduce((acc, cur) => acc + cur, 0);

  return (
    <Box className="flex-column" sx={{ gap: pageSpaces }}>
      <Box className="flex-row a-end j-between">
        <PageTitle
          title="Sales Statistics"
          icon={<img src="/icons/analytics.svg" />}
          description="Showing sales statistics like Monthly Earnings, Sales Growth, Monthly Targets and Avarage Earning"
        />
        <SelectBox
          defaultValue={currentYear}
          values={yearsArray()}
          onSelect={(value) => setYear(+value)}
        />
      </Box>
      <Grid container spacing={pageSpaces}>
        <Grid item xs={12} sm={4.5} md={3}>
          <DisplayInfoBox
            type="columnly"
            title="Total Earnings"
            isLoading={isLoading}
            body={`$${nDecorator(totalEarnings?.toFixed(2))}`}
            bodyColor="success.main"
            icon={<SvgIcon svgElementAsString={moneyIcon} />}
            iconColor={randomColorsArr[1]}
            BoxStyle={{ height: "100%", p: 2, justifyContent: "center" }}
          />
        </Grid>
        <Grid item xs={12} sm={7.5} md={4.5}>
          <Paper sx={{ p: 1, height: "200px" }}>
            <SalesGrowth />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4.5}>
          <MonthlyTargets
            currentYear={currentYear}
            monthesData={monthesData}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
      <Grid container spacing={pageSpaces}>
        <Grid item xs={12} sm={7.5} lg={8}>
          <Box sx={{ width: "100%" }}>
            <MonthlyEarningsChart
              currentYear={currentYear}
              monthesData={monthesData}
              isLoading={isLoading}
              refetch={refetch}
            />
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