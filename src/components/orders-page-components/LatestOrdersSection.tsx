import { Box } from '@mui/material';
import PageTitle from '../PageTitle';
import LatestOrdersTable from './LatestOrdersTable';
import RenderSectionWhenSpecificElementAppears from '../products-pages/RenderSectionWhenSpecificElementAppears';
import pageSpaces from '../../CONSTANTS/pageSpaces';

export default function LatestOrdersSection() {
    return (
        <Box id="latest-orders-section" className="flex-column" gap={pageSpaces}>
            <PageTitle
                title="Latest Orders"
                description="View the details of latest orders"
                icon={<img src="/icons/booking-history.svg" />}
            />
            <RenderSectionWhenSpecificElementAppears
                sectionIdToAbserve="latest-orders-section"
                section={<LatestOrdersTable />}
            />
        </Box>
    )
}
