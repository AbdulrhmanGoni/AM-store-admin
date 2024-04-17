import { IllustrationCard } from "@abdulrhmangoni/am-store-library";
import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    return (
        <IllustrationCard
            title="Not Found Page"
            alertType="info"
            message={`There is no page at this path '${pathname}'`}
            illustratorType="notFound"
            fullPage
        >
            <Box className="flex-row-center" gap={2}>
                <Button size="small" onClick={() => navigate(-1)} variant="contained">Back</Button>
                <Button size="small" onClick={() => navigate("/")} variant="contained">Home Page</Button>
            </Box>
        </IllustrationCard>
    )
}
