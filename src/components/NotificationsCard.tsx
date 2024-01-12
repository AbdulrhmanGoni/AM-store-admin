import { Alert, AlertColor, IconButton, Tooltip } from "@mui/material";
import { NotificationCenterItem } from "react-toastify/addons/use-notification-center";
import { MarkNotificationsAsReadType, Notification } from "../hooks/useNotificationsManager";
import { Check, MarkChatRead } from "@mui/icons-material";
import { timeAgo } from "@abdulrhmangoni/am-store-library";

interface NotificationsCardProps {
    notification: NotificationCenterItem<Notification>
    markNotificationsAsRead: MarkNotificationsAsReadType
}

export default function NotificationsCard({ notification, markNotificationsAsRead }: NotificationsCardProps) {
    const { id, type, read, data, createdAt, content } = notification

    return (
        <Alert
            severity={(type as AlertColor) || "info"}
            key={id}
            variant={read ? "standard" : "filled"}
            sx={{ color: "white" }}
            className="flex-row-center"
            action={
                read ? <Check fontSize="small" />
                    : (
                        <Tooltip title="Mark as read">
                            <IconButton
                                component="span"
                                size="small"
                                onClick={() => markNotificationsAsRead([id])}
                            >
                                <MarkChatRead fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )
            }
        >
            {data?.title || content?.toString()} - {timeAgo(data?.createdAt || new Date(createdAt).toISOString())}
        </Alert>
    )
}
