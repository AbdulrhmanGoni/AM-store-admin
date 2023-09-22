import { useTheme } from "@mui/material";
import moment from "moment";
import Chart from "react-apexcharts";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import ApexchartsContainer from "@/components/ApexchartsContainer";
import { ApexOptions } from "apexcharts";
import ChartTitle from "@/components/ChartTitle";
import { lineChartIcon } from "@/components/lineChartIcon";
import Icon from "@/components/SvgIcon";
import { chartCategory } from "./CategoriesEarningsPercentages";

export default function CategoriesEarnings({ data }: { data: chartCategory[] }) {

    const { palette: { mode } } = useTheme();
    const options: ApexOptions = {
        chart: { type: "area" },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Oug', 'Sep', 'Oct', "Des", "Nov"] },
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

    return (
        <ApexchartsContainer>
            <ChartTitle
                title="Categories Earnings"
                disableIconColor
                icon={<Icon disableIconColor svgElementAsString={lineChartIcon} />}
            />
            <Chart options={options} series={data} type="area" height={337} />
        </ApexchartsContainer>
    )
}



