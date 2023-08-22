import { useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Chart from "react-apexcharts";
import { numbersDecorator } from "goni-functions";
import useStatisticsQueries from "@/hooks/useStatisticsQueries";
import ApexchartsContainer from "./ApexchartsContainer";

export default function CategoriesCharts() {

    const { palette: { mode, primary } } = useTheme();
    const { statistics_categories } = useStatisticsQueries()
    const { data } = useQuery({
        queryKey: ["categories-earnings"],
        queryFn: statistics_categories
    });
    
    const options = {
        chart: {
            type: "area"
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'Monthly Profits',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Oug', 'Sep', 'Oct', "Des", "Nov"]
        },
        yaxis: {
            title: {
                text: 'Dolars ($)'
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
            x: {
                formatter: (index, v) => {
                    return moment().month(v.w.globals.categoryLabels[index - 1]).format("MMMM")
                },
            },
            y: {
                formatter: function (val) {
                    return "$" + numbersDecorator(val)
                }
            },
        },
    }

    const series = Object.keys(data ?? {}).map(category => {
        return {
            name: category,
            data: data[category].map(doc => doc.totalEarnings.toFixed(2))
        }
    })

    return (
        <ApexchartsContainer title="Categories profits">
            {/* @ts-ignore */}
            <Chart options={options} series={series} type="area" height={250} width={"100%"} />
        </ApexchartsContainer>
    )
}



