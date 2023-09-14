import { useTheme } from "@mui/material";
import moment from "moment";
import Chart from "react-apexcharts";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import ApexchartsContainer from "@/components/ApexchartsContainer";
import { faker } from "@faker-js/faker";
import randomColorsArr from "@/CONSTANT/randomColorsArr";
import { ApexOptions } from "apexcharts";
import ChartTitle from "@/components/ChartTitle";
import { productsIcon } from "@/components/svgIconsAsString";
import Icon from "@/components/SvgIcon";

export default function CategoriesCharts({ data }) {

    const { palette: { mode } } = useTheme();

    const options: ApexOptions = {
        chart: { type: "area" },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Oug', 'Sep', 'Oct', "Des", "Nov"]
        },
        yaxis: { title: { text: 'Dolars ($)' } },
        theme: { mode },
        fill: { type: "image" },
        tooltip: {
            x: {
                formatter: (index: number, config: { w: { globals: { categoryLabels: (string | number)[]; }; }; }) => {
                    return moment().month(config.w.globals.categoryLabels[index - 1]).format("MMMM")
                },
            },
            y: { formatter: (value: number, obj: string) => { obj = "$" + nDecorator(value); return obj } }
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
        <ApexchartsContainer>
            <ChartTitle title="Categories Earnings" icon={<Icon svgElementAsString={productsIcon} />} />
            <Chart options={options} series={series} type="area" height={337} />
        </ApexchartsContainer>
    )
}



