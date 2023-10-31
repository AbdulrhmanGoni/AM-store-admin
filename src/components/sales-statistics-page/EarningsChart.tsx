import { useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import ApexchartsContainer from "../ApexchartsContainer";
import { faker } from "@faker-js/faker";
import { ApexOptions } from "apexcharts";
import { Money } from "@mui/icons-material";
import ChartTitle from "../ChartTitle";
import { MonthStatistics, MonthlyStatistics } from "../../hooks/useMonthlyStatistics";
import MONTHES, { MONTHES_FULL_NAME } from "../../CONSTANTS/MONTHES";

interface EarningsChartProps extends MonthlyStatistics { }

export default function EarningsChart({ monthesData }: EarningsChartProps) {

    const { palette: { mode, primary } } = useTheme();
    const options: ApexOptions = {
        chart: { type: "area" },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: { categories: MONTHES },
        yaxis: { title: { text: 'Dolars ($)' } },
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
            x: {
                formatter: (index) => MONTHES_FULL_NAME[index - 1],
            },
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
            data: monthesData?.map((doc: MonthStatistics) => {
                const randomNimber = faker.number.float({ precision: 0.02, max: 5000, min: 4000 });
                return doc.totalEarnings ? +doc.totalEarnings.toFixed(2) : randomNimber
            }) ?? [0]
        }
    ]

    return (
        <ApexchartsContainer>
            <ChartTitle title="Monthly Earnings" icon={<Money />} />
            <Chart options={options} series={series} type="area" height={285} />
        </ApexchartsContainer>
    )
}