import { Box } from "@mui/material";
import pageSpaces from "../CONSTANTS/pageSpaces";
import TitleAndStatisticsBoxesSections from "../components/orders-page-components/TitleAndStatisticsBoxesSections";
import MonthlyOrdersChartAndAvarageOrdersSection from "../components/orders-page-components/MonthlyOrdersChartAndAvarageOrdersSection";
import LatestOrdersSection from "../components/orders-page-components/LatestOrdersSection";

export default function OrdersManagementPage() {
    return (
        <Box className="flex-column" gap={pageSpaces}>
            <TitleAndStatisticsBoxesSections />
            <MonthlyOrdersChartAndAvarageOrdersSection />
            <LatestOrdersSection />
        </Box>
    )
}