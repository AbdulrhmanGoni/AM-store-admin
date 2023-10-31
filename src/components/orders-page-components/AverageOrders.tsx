import CustomChartBox from "../CustomChartBox";
import SvgIcon from "../SvgIcon";
import { averageOrdersIcon } from "../svgIconsAsString";
import { SmalBar } from "../SmallChart";
import { Box, Typography } from "@mui/material";
import { PromiseState } from "@abdulrhmangoni/am-store-library";

interface AverageOrdersProps extends PromiseState{ 
    data: number[], 
    totalOrders: number,
}
export default function AverageOrders({ data, isLoading, isError, totalOrders }: AverageOrdersProps) {

    return (
        <CustomChartBox
            title="Average orders"
            smallChart={<SmalBar data={data} />}
            customMainValue={
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "1.7rem",
                            color: "success.main"
                        }}
                    >
                        {Math.floor(totalOrders / data?.length)} Orders
                    </Typography>
                    <Typography variant="body1">Per month</Typography>
                </Box>
            }
            isLoading={isLoading}
            isError={isError}
            titleIcon={<SvgIcon svgElementAsString={averageOrdersIcon} />}
            chartDescription={{ title: totalOrders, subTitle: "Total This Year" }}
        />
    )
}
