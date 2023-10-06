import moment from "moment";
import Chart from "react-apexcharts";
import ApexchartsContainer from "@/components/ApexchartsContainer";
import { useTheme } from "@mui/material";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { ApexOptions } from "apexcharts";
import Icon from "@/components/SvgIcon";
import { averageOrdersIcon } from "@/components/svgIconsAsString";
import ChartTitle from "@/components/ChartTitle";

type OrdersStatisticsChartProps = {
    data: any,
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
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Oug', 'Sep', 'Oct', "Des", "Nov"] },
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
            x: { formatter: (month: number) => moment().month(month).format("MMMM") },
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