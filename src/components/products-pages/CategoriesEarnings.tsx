import { useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import ApexchartsContainer from "../ApexchartsContainer";
import { ApexOptions } from "apexcharts";
import ChartTitle from "../ChartTitle";
import { lineChartIcon } from "../lineChartIcon";
import Icon from "../SvgIcon";
import MONTHES, { MONTHES_FULL_NAME } from "../../CONSTANTS/MONTHES";
import { chartCategory } from "../../hooks/useMonthlyCategoriesStatistics";


export default function CategoriesEarnings({ data }: { data: chartCategory[] }) {

    const { palette: { mode } } = useTheme();
    const options: ApexOptions = {
        chart: { type: "area" },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: { categories: MONTHES },
        yaxis: { title: { text: 'Dolars ($)' } },
        theme: { mode },
        fill: { type: "image" },
        tooltip: {
            x: { formatter: (index: number) => MONTHES_FULL_NAME[index - 1] },
            y: { formatter: (value: number) => "$" + nDecorator(value) }
        },
    }

    return (
        <ApexchartsContainer sx={{
            "& .apexcharts-legend-text": { ml: "-10px !important" }
        }}>
            <ChartTitle
                title="Categories Earnings"
                disableIconColor
                icon={<Icon disableIconColor svgElementAsString={lineChartIcon} />}
            />
            <Chart options={options} series={data} type="area" height={280} />
        </ApexchartsContainer>
    )
}



