import Chart from "react-apexcharts";
import ApexchartsContainer from "../ApexchartsContainer";
import { useTheme } from "@mui/material";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { ApexOptions } from "apexcharts";
import Icon from "../SvgIcon";
import { totalIcon } from "../../components/svgIconsAsString";
import ChartTitle from "../../components/ChartTitle";
import { PromiseState } from "../../types/interfaces";


export type TopCategoriesCartData = {
    categories: string[],
    values: number[]
}

interface TopCategoriesCartProps extends PromiseState {
    data: {
        categories: string[],
        values: number[]
    },
    height?: number
}

export default function TopCategories({ data: { categories, values }, height }: TopCategoriesCartProps) {

    const { palette: { mode, primary } } = useTheme();

    const options: ApexOptions = {
        chart: { type: 'bar' },
        plotOptions: { bar: { borderRadius: 4, horizontal: true } },
        colors: [primary.main],
        theme: { mode },
        dataLabels: { enabled: false },
        xaxis: { categories },
        yaxis: { labels: { style: { fontSize: "14px" } } },
        tooltip: { y: { formatter: (value: number, obj: string) => { obj = `${nDecorator(value)}`; return obj } } }
    };

    const series = [{ name: "Products Sold", data: values }]

    return (
        <ApexchartsContainer>
            <ChartTitle
                title="Categories sales"
                containerStyle={{ pb: "0px" }}
                icon={<Icon svgElementAsString={totalIcon} />}
            />
            <Chart options={options} series={series} type="bar" height={height} />
        </ApexchartsContainer>
    )
} 