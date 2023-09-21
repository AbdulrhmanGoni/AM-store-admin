import Chart from "react-apexcharts";
import ApexchartsContainer from "@/components/ApexchartsContainer";
import { useTheme } from "@mui/material";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { ApexOptions } from "apexcharts";
import Icon from "@/components/SvgIcon";
import { totalIcon } from "@/components/svgIconsAsString";
import ChartTitle from "@/components/ChartTitle";
import { PromiseState } from "@/types/interfaces";


export type TopCategoriesCartData = {
    categories: string[],
    values: number[]
}

interface TopCategoriesCartProps extends PromiseState {
    data: {
        categories: string[],
        values: number[]
    }
}

export default function TopCategoriesCart({ data: { categories, values } }: TopCategoriesCartProps) {

    const { palette: { mode, primary } } = useTheme();

    const options: ApexOptions = {
        chart: { type: 'bar' },
        plotOptions: { bar: { borderRadius: 4, horizontal: true } },
        colors: [primary.main],
        theme: { mode },
        dataLabels: { enabled: false },
        xaxis: { categories: categories ?? ['Clothes', 'Figures', 'Panels'] },
        yaxis: { labels: { style: { fontSize: "14px" } } },
        tooltip: { y: { formatter: (value: number, obj: string) => { obj = `${nDecorator(value)}`; return obj } } }
    };

    const series = [{ name: "Products Sold", data: values ?? [400, 430, 448] }]

    return (
        <ApexchartsContainer>
            <ChartTitle
                title="Categories sales"
                containerStyle={{ pb: "0px" }}
                icon={<Icon svgElementAsString={totalIcon} />}
            />
            <Chart options={options} series={series} type="bar" height={200} />
        </ApexchartsContainer>
    )
} 