import SvgIcon from "@/components/SvgIcon";
import { averageOrdersIcon } from "@/components/svgIconsAsString";
import { SmalBar } from "@/components/SmallChart";
import { faker } from "@faker-js/faker";
import { Box, Paper, Typography } from "@mui/material";
import SmallIconBox from "@/components/SmallIconBox";
import { CSSProperties } from "@mui/material/styles/createMixins";

type AverageOrdersProps = {
    data: any[],
    hideTheChart?: boolean,
    sx?: CSSProperties
}

export default function AverageOrders({ data, hideTheChart, sx }: AverageOrdersProps) {

    const dataChart: number[] = data?.map((doc: { totalOrder: number }) => {
        let randomNimber = faker.number.float({ precision: 1, max: 50, min: 30 });
        return !!doc.totalOrder ? doc.totalOrder : randomNimber
    })
    const total: number = dataChart?.reduce((acc, cur) => acc + cur, 0);

    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1, p: 1,
                height: "100%",
                width: "100%",
                textAlign: "center",
                ...sx
            }}
        >
            <SmallIconBox
                boxStyle={{ borderRadius: "50%", p: 1 }}
                icon={<SvgIcon svgElementAsString={averageOrdersIcon} />}
            />
            <Typography variant="h6">Average Orders</Typography>
            <Box>
                <Typography
                    variant="body1"
                    sx={{ fontSize: "1.7rem", color: "success.main" }}
                >
                    {Math.floor(total / dataChart?.length)} Orders
                </Typography>
                <Typography variant="body1">Per month</Typography>
            </Box>
            {!hideTheChart && <SmalBar width={"100%"} height={80} data={dataChart} />}
        </Paper>
    )
}
