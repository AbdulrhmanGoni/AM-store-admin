import { Box } from "@mui/material";
import LatestOrdersTable from "../components/orders-page-components/LatestOrdersTable"
import PageTitle from "../components/PageTitle";
import pageSpaces from "../CONSTANTS/pageSpaces";
import TitleAndStatisticsBoxesSections from "../components/orders-page-components/TitleAndStatisticsBoxesSections";
import MonthlyOrdersChartAndAvarageOrdersSection from "../components/orders-page-components/MonthlyOrdersChartAndAvarageOrdersSection";

export default function OrdersManagementPage() {
    return (
        <Box className="flex-column" gap={pageSpaces}>
            <TitleAndStatisticsBoxesSections />
            <MonthlyOrdersChartAndAvarageOrdersSection />
            <PageTitle
                title="Latest Orders"
                description="View the details of latest orders"
                icon={<img src="/icons/booking-history.svg" />}
            />
            <LatestOrdersTable />
        </Box>
    )
}