import { MessageCard, P, timeAgo, OptionsMenu } from "@abdulrhmangoni/am-store-library";
import { UserFeedback } from "../../hooks/useUsersFeedbacks";
import useApiRequest from "../../hooks/useApiRequest";
import host from "../../CONSTANTS/API_hostName";
import { Delete } from "@mui/icons-material";
import useNotifications from "../../hooks/useNotifications";

interface FeedbackCardProps {
    feedback: UserFeedback,
    deleteFeedback: (itemId: string, itemsIdPropertyName: string) => void
}

export default function FeedbackCard({ feedback, deleteFeedback }: FeedbackCardProps) {

    const url = `${host}/feedbacks?feedbackId=${feedback._id}`;
    const { api } = useApiRequest();
    const { message } = useNotifications();

    async function deleteTheFeedback() {
        return await api.delete(url)
            .then(() => { deleteFeedback(feedback._id, "_id") })
            .catch(() => message("Failed to delete the feedback !", "error"))
    }

    return (
        <MessageCard
            userName={feedback.userData?.userName || "Anonymous"}
            avatar={feedback.userData?.avatar}
            message={feedback.subject}
            timeAgo={timeAgo(feedback.createdAt)}
            cardStyle={{ position: "relative" }}
        >
            <P>{feedback.body}</P>
            <OptionsMenu>
                <OptionsMenu.Option
                    optionIcon={<Delete />}
                    optionText="Delete"
                    asyncAction={deleteTheFeedback}
                />
            </OptionsMenu>
        </MessageCard>
    )
}
