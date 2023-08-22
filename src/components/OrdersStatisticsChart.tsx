import Chart from "react-apexcharts";
import { useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { numbersDecorator } from "goni-functions";
import moment from "moment";
import useStatisticsQueries from "@/hooks/useStatisticsQueries";
import ApexchartsContainer from "./ApexchartsContainer";

export default function OrdersStatisticsChart() {

    const { statistics_orders } = useStatisticsQueries();

    const { palette: { mode, primary } } = useTheme();
    const { data } = useQuery({
        queryKey: ["orders-statistics"],
        queryFn: statistics_orders
    });

    const options = {
        chart: {
            type: 'bar'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '65%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Oug', 'Sep', 'Oct', "Des", "Nov"]
        },
        yaxis: {
            title: {
                text: 'Orders'
            }
        },
        fill: {
            opacity: 1
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
            x: { formatter: (month: string) => moment().month(month).format("MMMM") },
            y: { formatter: (val: number) => numbersDecorator(val) },
        }
    }

    const series = [
        {
            name: 'Orders Count',
            data: data?.map((doc: { totalOrders: number }) => (doc.totalOrders).toFixed(2)) ?? [0]
        }
    ]

    return (
        <ApexchartsContainer title="Total orders per months">
            {/* @ts-ignore */}
            <Chart options={options} series={series} type="bar" height={250} />
        </ApexchartsContainer>
    )
} 
