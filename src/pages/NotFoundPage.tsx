import { IllustrationCard } from "@abdulrhmangoni/am-store-library";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const media = useMediaQuery("(max-width: 599px)");
    const { pathname } = useLocation();
    const back = useNavigate();
    return (
        <IllustrationCard
            title="Not Found Page"
            alertType="info"
            message={`There is no page at this path '${pathname}'`}
            illustratorType="notFound"
        >
            <Box className="flex-row-center" gap={2}>
                <Button size={media ? "small" : "large"} onClick={() => back(-1)} variant="contained">Back</Button>
                <Button size={media ? "small" : "large"} variant="contained">Do Something</Button>
            </Box>
        </IllustrationCard>
    )
}
