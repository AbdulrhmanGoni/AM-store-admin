import { Container, Divider } from "@mui/material";
import PageTitle from "../components/PageTitle";
import FeedbacksList from "../components/users-feedbacks-page/FeedbacksList";

export default function UsersFeedbacksPage() {
    return (
        <Container maxWidth="md">
            <PageTitle
                title="Users Feedbacks"
                description="The problems that the users faced or the questions that they have"
            />
            <Divider sx={{ my: 2 }} />
            <FeedbacksList />
        </Container>
    )
}
