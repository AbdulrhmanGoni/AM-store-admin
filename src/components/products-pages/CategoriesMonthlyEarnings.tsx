import { useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import { P, nDecorator } from "@abdulrhmangoni/am-store-library";
import ApexchartsContainer from "../ApexchartsContainer";
import { ApexOptions } from "apexcharts";
import ChartTitle from "../ChartTitle";
import { lineChartIcon } from "../lineChartIcon";
import Icon from "../SvgIcon";
import MONTHES, { MONTHES_FULL_NAME } from "../../CONSTANTS/MONTHES";
import useMonthlyCategoriesStatistics from "../../hooks/useMonthlyCategoriesStatistics";


export default function CategoriesMonthlyEarnings() {

    const { chartData: { earningsChartData }, year } = useMonthlyCategoriesStatistics();

    const { palette: { mode } } = useTheme();
    const options: ApexOptions = {
        chart: { type: "area" },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: { categories: MONTHES },
        yaxis: {
            labels: {
                formatter(val, opts) { opts = nDecorator(val, true); return opts },
            }
        },
        theme: { mode },
        fill: { type: "image" },
        tooltip: {
            x: { formatter: (index: number) => MONTHES_FULL_NAME[index - 1] },
            y: { formatter: (value: number) => "$" + nDecorator(value) }
        },
    }

    return (
        <ApexchartsContainer>
            <ChartTitle
                title="Categories Monthly Earnings"
                disableIconColor
                icon={<Icon disableIconColor svgElementAsString={lineChartIcon} />}
                endItem={<P variant="h6">{year}</P>}
            />
            <Chart options={options} series={earningsChartData} type="area" height={280} />
        </ApexchartsContainer>
    )
}