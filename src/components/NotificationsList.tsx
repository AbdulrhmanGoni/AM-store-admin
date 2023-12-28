import { Stack } from '@mui/material';
import { NotificationCenterItem } from 'react-toastify/addons/use-notification-center';
import { Notification } from '../hooks/useNotificationsManager';
import NotificationsCard from './NotificationsCard';
import { P } from '@abdulrhmangoni/am-store-library';

interface NotificationsListProps {
    notifications: NotificationCenterItem<Notification>[]
    showUnreadNotificationsOnly: boolean
    unreadNotificationsCount: number
    markAsRead: (id: string) => void
}

export default function NotificationsList(props: NotificationsListProps) {

    const { notifications, unreadNotificationsCount, showUnreadNotificationsOnly, markAsRead } = props;

    const noNotifications = !notifications.length || (unreadNotificationsCount === 0 && showUnreadNotificationsOnly)
    const notificationsList = showUnreadNotificationsOnly ? notifications.filter((v) => !v.read) : notifications

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
                notificationsList.map((notification) => {
                    return (
                        <NotificationsCard
                            key={notification.id}
                            notification={notification}
                            markAsRead={markAsRead}
                        />
                    );
                })
            }
        </Stack>
    )
}
