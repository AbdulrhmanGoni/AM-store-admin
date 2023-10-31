import Chart from "react-apexcharts";
import ApexchartsContainer from "../ApexchartsContainer";
import { useTheme } from "@mui/material";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { ApexOptions } from "apexcharts";
import Icon from "../SvgIcon";
import { averageOrdersIcon } from "../svgIconsAsString";
import ChartTitle from "../ChartTitle";
import MONTHES, { MONTHES_FULL_NAME } from "../../CONSTANTS/MONTHES";

type OrdersStatisticsChartProps = {
    data: number[],
    totalOrders?: number,
    isLoading?: boolean,
    isError?: boolean
}
export default function OrdersStatisticsChart({ data }: OrdersStatisticsChartProps) {

    const { palette: { mode, primary } } = useTheme();

    const options: ApexOptions = {
        chart: { type: 'bar', stacked: true },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '65%',
            },
        },
        dataLabels: { enabled: false },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: { categories: MONTHES },
        yaxis: { title: { text: 'Orders' } },
        fill: { opacity: 1 },
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
                formatter: (_: number, details: { dataPointIndex: number }) => MONTHES_FULL_NAME[details.dataPointIndex]
            },
            y: {
                formatter: (value, obj) => { obj = nDecorator(value); return obj }
            },
        }
    }

    const series = [
        { name: 'Complated Orders', data }
    ]

    return (
        <ApexchartsContainer>
            <ChartTitle title="Monthly Orders" icon={<Icon svgElementAsString={averageOrdersIcon} />} />
            <Chart options={options} series={series} type="bar" height={285} />
        </ApexchartsContainer>
    )
} 