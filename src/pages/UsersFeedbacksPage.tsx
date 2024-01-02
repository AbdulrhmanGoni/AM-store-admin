import { Alert, Box, Container, Divider } from "@mui/material";
import PageTitle from "../components/PageTitle";
import useUsersFeedbacks from "../hooks/useUsersFeedbacks";
import { FetchFailedAlert, MessageCard, P, timeAgo } from "@abdulrhmangoni/am-store-library";
import LoadingMessagesCards from "../components/users-feedbacks-page/LoadingMessagesCards";

export default function UsersFeedbacksPage() {

    const {
        feedbacks,
        isLoading,
        isError,
        refetch
    } = useUsersFeedbacks();

    return (
        <Container maxWidth="md">
            <PageTitle
                title="Users Feedbacks"
                description="The problems that the users faced or the questions that they have"
            />
            <Divider sx={{ my: 2 }} />
            <Box className="flex-column gap1">
                {
                    feedbacks.length ?
                        feedbacks.map((feedback) => {
                            return (
                                <MessageCard
                                    key={feedback._id}
                                    userName={feedback.userData?.userName || "Anonymous"}
                                    avatar={feedback.userData?.avatar}
                                    message={feedback.subject}
                                    timeAgo={timeAgo(feedback.createdAt)}
                                >
                                    <P>{feedback.body}</P>
                                </MessageCard>
                            )
                        })
                        : (!isError && !isLoading) &&
                        <Alert severity="info">No Feedbacks</Alert>
                }
                {isLoading && <LoadingMessagesCards cardsNumber={6} />}
                {
                    isError && !isLoading &&
                    <FetchFailedAlert refetch={refetch} message="Failed to fetch users feedbacks" />
                }
            </Box>
        </Container>
    )
}
