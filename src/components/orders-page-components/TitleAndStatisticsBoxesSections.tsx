import { Box, Grid, IconButton } from "@mui/material";
import pageSpaces from "../../CONSTANTS/pageSpaces";
import DisplayInfoBox from "../DisplayInfoBox";
import { PromiseState, nDecorator } from "@abdulrhmangoni/am-store-library";
import SvgIcon from "../SvgIcon";
import { orderIcon, totalIcon } from "../svgIconsAsString";
import randomColorsArr from "../../CONSTANTS/randomColorsArr";
import { CSSProperties } from "@mui/material/styles/createMixins";
import { Refresh } from "@mui/icons-material";
import PageTitle from "../PageTitle";
import SelectBox from "../SelectBox";
import useOrdersStatistics from "../../hooks/useOrdersStatistics";
import useYearsArray from "../../hooks/useYearsArray";

export default function TitleAndStatisticsBoxesSections() {

    const {
        data: ordersStatistics,
        setYear,
        currentYear,
        isLoading: statisticsAreLoading,
        isError: statisticsError,
        refetch: refetchStatistics
    } = useOrdersStatistics();

    const {
        totalOrders,
        canceledOrders,
        completedOrders,
        pendingOrders
    } = ordersStatistics;

    const { yearsArray } = useYearsArray();

    const sharedProps: { boxStyle: CSSProperties, type: "columnly" } & PromiseState = {
        isLoading: statisticsAreLoading,
        isError: statisticsError,
        type: "columnly",
        boxStyle: {
            width: "100%",
            height: "100%",
            p: 2,
            position: "relative"
        }
    }

    const statisticsTypes: { title: string, body: string | number, icon: JSX.Element }[] = [
        {
            title: "Total Orders",
            body: nDecorator(totalOrders),
            icon: <SvgIcon svgElementAsString={totalIcon} />
        },
        {
            title: "Completed Orders",
            body: nDecorator(completedOrders),
            icon: <img src="/icons/completed.svg" />
        },
        {
            title: "Pending Orders",
            body: nDecorator(pendingOrders),
            icon: <img src="/icons/waiting.svg" />
        },
        {
            title: "Canceled Orders",
            body: nDecorator(canceledOrders),
            icon: <img src="/icons/canceling.svg" />
        },
    ]

    return (
        <>
            <Box className="flex-row a-end j-between gap1" flexWrap="wrap">
                <PageTitle
                    title="Orders Management"
                    description="View statistics, View latest orders, Search for orders"
                    icon={<SvgIcon svgElementAsString={orderIcon} />}
                />
                <SelectBox
                    defaultValue={currentYear}
                    values={yearsArray}
                    onSelect={(value) => setYear(+value)}
                />
            </Box>
            <Grid container spacing={pageSpaces}>
                {
                    statisticsTypes.map((statistic, index) => (
                        <Grid item xs={6} md={3} key={statistic.title}>
                            <DisplayInfoBox
                                {...sharedProps}
                                {...statistic}
                                iconColor={randomColorsArr[index]}
                            >
                                {
                                    statisticsError && !statisticsAreLoading &&
                                    <IconButton
                                        onClick={() => refetchStatistics()}
                                        sx={{
                                            position: "absolute",
                                            top: 5,
                                            right: 5
                                        }}
                                    >
                                        <Refresh fontSize="small" color="error" />
                                    </IconButton>
                                }
                            </DisplayInfoBox>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}
