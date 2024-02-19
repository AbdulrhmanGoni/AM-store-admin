import CustomChartBox from "../CustomChartBox";
import SvgIcon from "../SvgIcon";
import { growChartIcon2 } from "../growChartIcon";
import { NorthEast, SouthEast } from "@mui/icons-material";
import { SmalLine } from "../SmallChart";
import { P, nDecorator } from "@abdulrhmangoni/am-store-library";
import useGetApi from "../../hooks/useGetApi";
import { Box } from "@mui/material";

interface SalesGrowthType {
    beforeLastMonth: {
        year: number,
        earnings: number,
        month: string
    },
    lastMonth: {
        year: number,
        month: string,
        earnings: number
    },
    growthRate: number
}

export default function SalesGrowth() {

    const query = "sales-growth"
    const { data: growthRateData, isFetching: isLoading, isError } = useGetApi<SalesGrowthType>({
        path: `statistics?queryKey=${query}`,
        key: [query]
    });

    const lastMonthEarnings = growthRateData?.lastMonth.earnings || 0;
    const beforeLastMonthEarnings = growthRateData?.beforeLastMonth.earnings || 0;
    const growthRate = growthRateData?.growthRate || 0

    const stateArrow = growthRate < 0 ? <SouthEast /> : <NorthEast />

    return (
        <CustomChartBox
            title="Sales Growth"
            titleIcon={<SvgIcon svgElementAsString={growChartIcon2} />}
            isLoading={isLoading}
            isError={isError}
            customMainValue={
                <Box className="flex-column">
                    <P variant="subtitle1" color="inherit">Last Month</P>
                    <P className="flex-row-center-start" variant="h5" color={growthRate < 0 ? "error" : "success"}>
                        {growthRate}% {stateArrow}
                    </P>
                </Box>
            }
            smallChart={<SmalLine data={[beforeLastMonthEarnings, lastMonthEarnings]} tooltipIsMony />}
            chartDescription={{
                title: ``,
                titleEndIcon: (
                    <Box color={growthRate < 0 ? "error.main" : "success.main"} className="flex-row-center-start">
                        <P variant="h6" color="inherit">
                            $ {nDecorator((lastMonthEarnings - beforeLastMonthEarnings).toFixed(2))}
                        </P>
                        {stateArrow}
                    </Box>
                ),
                subTitle: `
                ${growthRateData?.beforeLastMonth.month}
                ${growthRateData?.beforeLastMonth.year} 
                - 
                ${growthRateData?.lastMonth.month}
                ${growthRateData?.lastMonth.year}
                `
            }}
        />
    )
}