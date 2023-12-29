import { Stack } from '@mui/material';
import { NotificationCenterItem } from 'react-toastify/addons/use-notification-center';
import { MarkNotificationsAsReadType, Notification } from '../hooks/useNotificationsManager';
import NotificationsCard from './NotificationsCard';
import { P } from '@abdulrhmangoni/am-store-library';

interface NotificationsListProps {
    notifications: NotificationCenterItem<Notification>[]
    markNotificationsAsRead: MarkNotificationsAsReadType
}

export default function NotificationsList(props: NotificationsListProps) {

    const { notifications, markNotificationsAsRead } = props;

    const noNotifications = !notifications.length

    return (
        <Stack
            spacing={1}
            sx={{
                bgcolor: "background.paper",
                height: "400px",
                width: { xs: "100%", sm: "450px" },
                p: 1,
                overflowY: "auto"
            }}
        >
            {noNotifications && <P>No Notifications</P>}
            {
                notifications.map((notification) => {
                    return (
                        <NotificationsCard
                            key={notification.id}
                            notification={notification}
                            markNotificationsAsRead={markNotificationsAsRead}
                        />
                    );
                })
            }
        </Stack>
    )
}
