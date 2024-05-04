import Chart from "react-apexcharts";
import ApexchartsContainer from "../ApexchartsContainer";
import { Skeleton, useTheme } from "@mui/material";
import { FetchFailedAlert, PromiseState, nDecorator } from "@abdulrhmangoni/am-store-library";
import { ApexOptions } from "apexcharts";
import Icon from "../SvgIcon";
import { averageOrdersIcon } from "../svgIconsAsString";
import ChartTitle from "../ChartTitle";
import MONTHES, { MONTHES_FULL_NAME } from "../../CONSTANTS/MONTHES";
import SelectBox from "../SelectBox";
import useYearsArray from "../../hooks/useYearsArray";

interface OrdersStatisticsChartProps extends PromiseState {
    data: number[],
    currentYear: number,
    setYear: (year: number) => void,
    totalOrders?: number,
    refetch?: () => void
}

export default function OrdersStatisticsChart({ data, currentYear, setYear, isLoading, isError, refetch }: OrdersStatisticsChartProps) {

    const { palette: { mode, primary } } = useTheme();
    const { yearsArray } = useYearsArray();
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
        xaxis: { categories: MONTHES },
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
            x: {
                formatter: (_: number, details: { dataPointIndex: number }) => MONTHES_FULL_NAME[details.dataPointIndex]
            },
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
            <ChartTitle
                title="Monthly Orders"
                icon={<Icon svgElementAsString={averageOrdersIcon} />}
                endItem={
                    <SelectBox
                        defaultValue={currentYear}
                        values={yearsArray}
                        onSelect={(value) => setYear(+value)}
                    />
                }
            />
            {
                isLoading ? <Skeleton variant="rounded" height={CHART_HEIGHT} />
                    : isError ? <FetchFailedAlert
                        height={`${CHART_HEIGHT}px`}
                        message="Failed to fetch the data"
                        refetch={refetch}
                    />
                        : <Chart options={options} series={series} type="bar" height={CHART_HEIGHT} />
            }
        </ApexchartsContainer>
    )
}

const CHART_HEIGHT = 285