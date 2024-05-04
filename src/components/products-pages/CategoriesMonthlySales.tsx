import { useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import ApexchartsContainer from "../ApexchartsContainer";
import { ApexOptions } from "apexcharts";
import ChartTitle from "../ChartTitle";
import MONTHES, { MONTHES_FULL_NAME } from "../../CONSTANTS/MONTHES";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import useMonthlyCategoriesStatistics from "../../hooks/useMonthlyCategoriesStatistics";
import SelectBox from "../SelectBox";
import useYearsArray from "../../hooks/useYearsArray";


export default function CategoriesMonthlySales() {

    const { chartData: { salesChartData }, currentYear, setYear } = useMonthlyCategoriesStatistics()
    const { yearsArray } = useYearsArray();
    const { palette: { mode } } = useTheme();
    const options: ApexOptions = {
        theme: { mode },
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%'
        },
        xaxis: { categories: MONTHES },
        fill: { opacity: 1 },
        tooltip: {
            y: {
                formatter(val, opts) {
                    opts = nDecorator(val) + " Products sold"
                    return opts
                }
            },
            x: {
                formatter(_, opts) {
                    opts = MONTHES_FULL_NAME[opts.dataPointIndex]
                    return opts
                }
            }
        }
    };

    return (
        <ApexchartsContainer sx={{ "& .apexcharts-legend-text": { ml: "-10px !important" } }}>
            <ChartTitle
                title="Categories Monthly Sales"
                disableIconColor
                icon={<img src="/icons/bar-chart.svg" />}
                endItem={
                    <SelectBox
                        defaultValue={currentYear}
                        values={yearsArray}
                        onSelect={(value) => setYear(+value)}
                    />
                }
            />
            <Chart options={options} series={salesChartData} type="bar" height={280} />
        </ApexchartsContainer>
    )
}