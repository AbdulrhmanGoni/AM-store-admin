import { useEffect, useState } from 'react'
import useNotificationsEventSource from './useNotificationsEventSource';
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';
import { TypeOptions } from 'react-toastify';

export interface Notification {
    _id: string,
    title: string,
    description: string,
    type: TypeOptions
}

export default function useNotificationsManager() {

    const {
        notifications,
        clear,
        markAllAsRead,
        markAsRead,
        unreadCount: unreadNotificationsCount,
        add: addNotification
    } = useNotificationCenter<Notification>();

    const [showUnreadNotificationsOnly, setShowUnreadNotificationsOnly] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const toggleNotificationsCenter = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setIsOpen(!isOpen);
    };

    const toggleFilter = () => {
        setShowUnreadNotificationsOnly(!showUnreadNotificationsOnly);
    };

    const clearNotifications = () => {
        clear();
    };

    const notificationsEventSource = useNotificationsEventSource();

    function notificationsHandler(messageEvent: MessageEvent<string>) {
        const data = JSON.parse(messageEvent.data)
        if (data instanceof Array) {
            notifications.length && clear();
            data.forEach((notification) => {
                addNotification({
                    data: notification,
                    id: notification._id,
                    type: notification.type || "success"
                })
            })
        } else {
            if (data) {
                const notification = data as Notification
                addNotification({
                    data: notification,
                    id: notification._id,
                    type: notification.type || "success"
                })
            }
        }
    }

    useEffect(() => {
        const eventSource = notificationsEventSource()
        eventSource.addEventListener("message", notificationsHandler)
        return () => { eventSource.close() }
    }, [])

    return {
        notifications,
        toggleNotificationsCenter,
        notificationsCenterIsOpen: isOpen,
        anchorEl,
        toggleFilter,
        clearNotifications,
        markAllAsRead,
        markAsRead,
        unreadNotificationsCount,
        showUnreadNotificationsOnly
    }
}
