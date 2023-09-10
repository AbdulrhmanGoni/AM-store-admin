import { useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Chart from "react-apexcharts";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import useStatisticsQueries from "@/hooks/useStatisticsQueries";
import ApexchartsContainer from "@/components/ApexchartsContainer";
import { faker } from "@faker-js/faker";
import randomColorsArr from "@/CONSTANT/randomColorsArr";

export default function CategoriesCharts() {

    const { palette: { mode } } = useTheme();
    const { statistics_categories } = useStatisticsQueries()
    const { data } = useQuery({
        queryKey: ["categories-earnings"],
        queryFn: statistics_categories
    });

    const options = {
        chart: { type: "area" },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: {
            type: 'Monthly Profits',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Oug', 'Sep', 'Oct', "Des", "Nov"]
        },
        yaxis: { title: { text: 'Dolars ($)' } },
        theme: { mode },
        fill: { type: "image" },
        tooltip: {
            x: {
                formatter: (index: number, v) => {
                    return moment().month(v.w.globals.categoryLabels[index - 1]).format("MMMM")
                },
            },
            y: {
                formatter: function (val: number | string) {
                    return "$" + nDecorator(val)
                }
            },
        },
    }

    const series = Object.keys(data ?? {}).map((category, index) => {
        return {
            name: category,
            color: randomColorsArr[index],
            data: data[category]?.map((doc: { totalEarnings: number }) => {
                let randomNimber = faker.number.float({ precision: 0.02, max: 3000, min: 1500 });
                return doc.totalEarnings ? doc.totalEarnings.toFixed(2) : randomNimber
            }) ?? [0]
        }
    })

    return (
        <ApexchartsContainer title="Categories profits">
            {/* @ts-ignore */}
            <Chart options={options} series={series} type="area" height={400 - 15 - 32} />
        </ApexchartsContainer>
    )
}



