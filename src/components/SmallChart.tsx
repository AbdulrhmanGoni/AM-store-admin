import { Box, useTheme } from '@mui/material';
import Chart from "react-apexcharts";
import { JSX } from "react";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { ApexOptions } from 'apexcharts';

interface SmallChartOptions {
    tooltipIsMony?: boolean,
    colors?: string[]
}

interface SmallChartProps extends SmallChartOptions {
    data: number[],
    height?: number,
    width?: number
}

const Container = ({ children }: { children: JSX.Element }) => {
    return (
        <Box sx={{ "& svg": { backgroundColor: "transparent !important", overflow: "initial" } }}>
            {children}
        </Box>
    )
}
const useChartOptions = ({ tooltipIsMony, colors }: SmallChartOptions): ApexOptions => {
    const { palette: { mode, primary } } = useTheme();
    return {
        colors: colors ?? [primary.main],
        theme: { mode },
        tooltip: {
            fixed: { enabled: false },
            marker: { show: false },
            x: { show: false },
            y: {
                formatter: (val: number, obj) => {
                    obj = tooltipIsMony ? "$" + nDecorator(val.toFixed(2)) : val
                    return obj
                },
                title: { formatter: () => "" }
            }
        }
    }
}

export function SmalBar({ data, height, width, tooltipIsMony }: SmallChartProps) {

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            width: 100,
            height: 35,
            sparkline: { enabled: true }
        },
        plotOptions: { bar: { columnWidth: '80%' } },
        xaxis: { crosshairs: { width: 1 } },
        ...useChartOptions({ tooltipIsMony })
    }

    return (
        <Container>
            <Chart options={options} type='bar' series={[{ data }]} height={height ?? 60} width={width ?? 130} />
        </Container>
    )
}

export function SmalLine({ data, height, width, tooltipIsMony }: SmallChartProps) {

    const options: ApexOptions = {
        chart: {
            type: 'line', width: 150, height: 35,
            sparkline: { enabled: true }
        },
        stroke: { curve: 'smooth' },
        ...useChartOptions({ tooltipIsMony })
    };

    return (
        <Container>
            <Chart options={options} type='line' series={[{ data }]} height={height ?? 60} width={width ?? 130} />
        </Container>
    )
}

interface SmalDonutProps extends SmallChartProps {
    onSelect?: (targetIndex: number) => void
}
export function SmalDonut({ data, height = 100, width = 100, tooltipIsMony, colors, onSelect }: SmalDonutProps) {

    const options: ApexOptions = {
        chart: {
            type: 'donut',
            width,
            height,
            sparkline: { enabled: true },
            events: {
                dataPointSelection: function (_, __, config) {
                    onSelect?.(config.dataPointIndex)
                }
            }
        },
        stroke: { width: 1 },
        ...useChartOptions({ tooltipIsMony, colors })
    }
    return (
        <Container>
            <Chart options={options} type='donut' series={data} height={height} width={width} />
        </Container>
    )
}
