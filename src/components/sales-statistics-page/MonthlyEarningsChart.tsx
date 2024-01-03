import { Skeleton, useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import { FetchFailedAlert, nDecorator, P } from "@abdulrhmangoni/am-store-library";
import ApexchartsContainer from "../ApexchartsContainer";
import { ApexOptions } from "apexcharts";
import ChartTitle from "../ChartTitle";
import useMonthlySalesStatistics, { MonthSalesStatistics } from "../../hooks/useMonthlySalesStatistics";
import MONTHES, { MONTHES_FULL_NAME } from "../../CONSTANTS/MONTHES";


export default function MonthlyEarningsChart() {

    const { monthesData, year, isLoading, isError, refetch } = useMonthlySalesStatistics();

    const { palette: { mode, primary } } = useTheme();
    const options: ApexOptions = {
        chart: { type: "area" },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: { categories: MONTHES },
        yaxis: {
            labels: {
                formatter(val, opts) {
                    opts = nDecorator(val, true);
                    return opts
                }
            }
        },
        theme: {
            mode,
            monochrome: {
                enabled: true,
                color: primary.main,
                shadeTo: mode,
                shadeIntensity: 0.65
            }
        },
        tooltip: {
            x: { formatter: (index) => MONTHES_FULL_NAME[index - 1] },
            y: { formatter: (value: number) => "$" + nDecorator(value) }
        },
        noData: {
            text: "No data fetched yet",
            verticalAlign: 'middle',
            style: {
                color: primary.main,
                fontSize: '20px',
                fontFamily: "inherit"
            }
        }
    }

    const series: ApexAxisChartSeries = [
        {
            name: 'Earnings',
            data: monthesData?.map((doc: MonthSalesStatistics) => +doc.totalEarnings.toFixed(2)) ?? [0]
        }
    ]

    return (
        <ApexchartsContainer>
            <ChartTitle
                title="Monthly Earnings"
                icon={<img src="/icons/line-chart.svg" />}
                endItem={<P variant="h6">{year}</P>}
            />
            {
                isLoading ? <Skeleton variant="rounded" height={CHART_HEIGHT} />
                    : isError ? <FetchFailedAlert
                        height={`${CHART_HEIGHT}px`}
                        message="Failed to fetch the data"
                        refetch={refetch}
                    />
                        : <Chart options={options} series={series} type="area" height={CHART_HEIGHT} />
            }
        </ApexchartsContainer>
    )
}

const CHART_HEIGHT = 285