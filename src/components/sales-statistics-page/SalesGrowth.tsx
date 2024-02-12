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
    growthRete: number
}

export default function SalesGrowth() {

    const query = "sales-growth"
    const { data: growthReteData, isFetching: isLoading, isError } = useGetApi<SalesGrowthType>({
        path: `statistics?queryKey=${query}`,
        key: [query]
    });

    const lastMonthEarnings = growthReteData?.lastMonth.earnings || 0;
    const beforeLastMonthEarnings = growthReteData?.beforeLastMonth.earnings || 0;
    const growthRete = growthReteData?.growthRete || 0

    const stateArrow = growthRete < 0 ? <SouthEast /> : <NorthEast />

    return (
        <CustomChartBox
            title="Sales Growth"
            titleIcon={<SvgIcon svgElementAsString={growChartIcon2} />}
            isLoading={isLoading}
            isError={isError}
            smallChart={<SmalLine data={[beforeLastMonthEarnings, lastMonthEarnings]} tooltipIsMony />}
            mainValue={`${growthRete}%`}
            mainValueColor={growthRete < 0 ? "error" : "success"}
            mainValueEndIcon={stateArrow}
            chartDescription={{
                title: ``,
                titleEndIcon: (
                    <Box color={growthRete < 0 ? "error.main" : "success.main"} className="flex-row-center-start">
                        <P variant="h6" color="inherit">
                            $ {nDecorator((lastMonthEarnings - beforeLastMonthEarnings).toFixed(2))}
                        </P>
                        {stateArrow}
                    </Box>
                ),
                subTitle: `
                ${growthReteData?.beforeLastMonth.month}
                ${growthReteData?.beforeLastMonth.year} 
                - 
                ${growthReteData?.lastMonth.month}
                ${growthReteData?.lastMonth.year}
                `
            }}
        />
    )
}