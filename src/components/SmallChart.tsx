import { Box, useTheme } from '@mui/material';
import Chart from "react-apexcharts";
import { JSX } from "react";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { ApexOptions } from 'apexcharts';

type SmallChartProps = {
    data?: number[],
    height?: number,
    width?: number,
    tooltipIsMony?: boolean,
    colors?: string[]
}

const Container = ({ children }: { children: JSX.Element }) => {
    return (
        <Box sx={{ "& svg": { backgroundColor: "transparent !important" } }}>
            {children}
        </Box>
    )
}
const useChartOptions = (tooltipIsMony?: boolean, colors?: string[]): ApexOptions => {
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
        chart: { type: 'bar', width: 100, height: 35, sparkline: { enabled: true } },
        plotOptions: { bar: { columnWidth: '80%' } },
        xaxis: { crosshairs: { width: 1 } },
        ...useChartOptions(tooltipIsMony)
    }

    const series = [{ data: data ?? [33, 44, 42, 74, 42, 88, 47, 75, 65, 60, 19, 37] }]

    return (
        <Container>
            <Chart options={options} type='bar' series={series} height={height ?? 60} width={width ?? 130} />
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
        ...useChartOptions(tooltipIsMony)
    };

    const series = [{ data: data ?? [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14, 77] }]

    return (
        <Container>
            <Chart options={options} type='line' series={series} height={height ?? 60} width={width ?? 130} />
        </Container>
    )
}

export function SmalDonut({ data, height = 100, width = 100, tooltipIsMony, colors }: SmallChartProps) {

    const options: ApexOptions = {
        chart: { type: 'donut', width, height, sparkline: { enabled: true } },
        stroke: { width: 1 },
        ...useChartOptions(tooltipIsMony, colors)
    }
    return (
        <Container>
            <Chart options={options} type='donut' series={data ?? [43, 32, 12]} height={height} width={width} />
        </Container>
    )
}
