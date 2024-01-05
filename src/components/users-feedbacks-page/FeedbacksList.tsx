import { Alert, Box } from "@mui/material";
import useUsersFeedbacks from "../../hooks/useUsersFeedbacks";
import { FetchFailedAlert } from "@abdulrhmangoni/am-store-library";
import LoadingMessagesCards from "./LoadingMessagesCards";
import FeedbackCard from "./FeedbackCard";

export default function FeedbacksList() {

    const {
        feedbacks,
        isLoading,
        isError,
        refetch,
        deleteFeedback
    } = useUsersFeedbacks();

    return (
        <Box className="flex-column gap1">
            {
                feedbacks.length ?
                    feedbacks.map((feedback) => (
                        <FeedbackCard
                            key={feedback._id}
                            feedback={feedback}
                            deleteFeedback={deleteFeedback}
                        />
                    ))
                    : (!isError && !isLoading) &&
                    <Alert severity="info">No Feedbacks</Alert>
            }
            {isLoading && <LoadingMessagesCards cardsNumber={6} />}
            {
                isError && !isLoading &&
                <FetchFailedAlert refetch={refetch} message="Failed to fetch users feedbacks" />
            }
        </Box>
    )
}
