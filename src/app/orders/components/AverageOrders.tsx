import CustomChartBox from "@/components/CustomChartBox";
import SvgIcon from "@/components/SvgIcon";
import { averageOrdersIcon } from "@/components/svgIconsAsString";
import { SmalBar } from "@/components/SmallChart";
import { Box, Typography } from "@mui/material";

type AverageOrdersProps = { 
    data: any, 
    totalOrders: number, 
    isLoading?: boolean, 
    isError?: boolean
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
