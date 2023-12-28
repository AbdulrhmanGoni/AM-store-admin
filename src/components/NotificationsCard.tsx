import { Alert, AlertColor, IconButton, Tooltip } from "@mui/material";
import { NotificationCenterItem } from "react-toastify/addons/use-notification-center";
import { Notification } from "../hooks/useNotificationsManager";
import { Check, MarkChatRead } from "@mui/icons-material";

interface NotificationsCardProps {
    notification: NotificationCenterItem<Notification>
    markAsRead: (id: string) => void
}

export default function NotificationsCard({ notification, markAsRead }: NotificationsCardProps) {
    const { id, type, read, data } = notification
    return (
        <Alert
            severity={(type as AlertColor) || "info"}
            key={id}
            variant="filled"
            sx={{ color: "white", bgcolor: type === "success" ? "success.main" : undefined }}
            className="flex-row-center"
            action={
                read ? <Check fontSize="small" />
                    : (
                        <Tooltip title="Mark as read">
                            <IconButton
                                component="span"
                                size="small"
                                onClick={() => markAsRead(id as string)}
                            >
                                <MarkChatRead fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )
            }
        >
            {data?.title}
        </Alert>
    )
}
