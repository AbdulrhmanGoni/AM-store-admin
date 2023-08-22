import { Box, useTheme } from '@mui/material';
import React from 'react'
import Chart from "react-apexcharts";


export default function SmallChart() {

    const { palette: { mode, primary, text } } = useTheme();

    const optionsSpark3 = {
        chart: {
            type: 'area',
            height: 160,
            sparkline: {
                enabled: true
            },
        },
        stroke: {
            curve: 'straight'
        },
        fill: {
            opacity: 0.3
        },
        theme: { mode },
        xaxis: {
            crosshairs: {
                width: 1
            },
        },
        yaxis: {
            min: 0
        },
        title: {
            text: '$135,965',
            offsetX: 0,
            style: {
                fontSize: '24px',
            }
        },
        subtitle: {
            text: 'Profits',
            offsetX: 0,
            style: {
                fontSize: '14px',
            }
        }
    };

    return (
        <Box component="div" id='small-chart'>
            {/* @ts-ignore */}
            {/* <Chart type='line' options={optionsSpark3} height={200} /> */}
        </Box>
    )
}
var options2 = {
    series: [{ data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14] }],
    chart: {
        type: 'line',
        width: 100,
        height: 35,
        sparkline: { enabled: true }
    },
    tooltip: {
        fixed: { enabled: false },
        marker: { show: false },
        x: { show: false },
        y: {
            title: {
                formatter: function (seriesName) {
                    return ''
                }
            }
        }
    }
};

var chart2 = new ApexCharts(document.querySelector("#small-chart"), options2);
chart2.render();
