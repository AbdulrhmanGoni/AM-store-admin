import useStatisticsQueries from "@/hooks/useStatisticsQueries";
import { useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Chart from "react-apexcharts";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import ApexchartsContainer from "./ApexchartsContainer";


export default function Area() {
    const { statistics_earnings } = useStatisticsQueries()
    const { palette: { mode, primary } } = useTheme();
    const { data } = useQuery({
        queryKey: ["earnings-statistics"],
        queryFn: statistics_earnings
    });

    const options = {
        chart: { type: "area" },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: {
            type: 'Monthly Profits',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Oug', 'Sep', 'Oct', "Des", "Nov"]
        },
        yaxis: {
            title: { text: 'Dolars ($)' }
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
            x: {
                formatter: (index, confg) => {
                    return moment().month(confg.w.globals.categoryLabels[index - 1]).format("MMMM")
                },
            },
            y: {
                formatter: (val: number) => "$" + nDecorator(val)
            }
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

    const series = [
        {
            name: 'Earnings',
            data: data?.map((doc: { totalEarnings: number }) => (doc.totalEarnings).toFixed(2)) ?? [0]
        }
    ]

    return (
        <ApexchartsContainer title="Earnings">
            {/* @ts-ignore */}
            <Chart options={options} series={series} type="area" height={250} />
        </ApexchartsContainer>
    )
}



