import { useEffect, useState } from 'react'
import useEventSource from './useEventSource';
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';
import { Id, TypeOptions } from 'react-toastify';
import useApiRequest from './useApiRequest';
import host from '../CONSTANTS/API_hostName';
import useNotifications from './useNotifications';
import notificationSound from '../functions/notificationSound';

export interface Notification {
    _id: string,
    title: string,
    description: string,
    type: TypeOptions,
    createdAt: string
}

export type MarkNotificationsAsReadType = (id: Id[], markAll?: boolean) => Promise<void>

export default function useNotificationsManager() {

    const {
        notifications,
        clear,
        markAllAsRead,
        markAsRead,
        unreadCount: unreadNotificationsCount,
        add
    } = useNotificationCenter<Notification>();
    const { message } = useNotifications();
    const { api } = useApiRequest()

    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const toggleNotificationsCenter = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setIsOpen(!isOpen);
    };

    const getServerNotfications = () => {
        const notificationsList = notifications.filter(({ read, data }) => !read && data);
        return notificationsList.map(({ id }) => id);
    };

    const markNotificationsAsRead: MarkNotificationsAsReadType = async (notificationsIds, markAll) => {
        function done() {
            if (markAll) markAllAsRead();
            else markAsRead(notificationsIds);
        }
        if (notificationsIds.length) {
            return await api.post(`${host}/notifications`, { notificationsIds })
                .then(done)
                .catch(() => { message("Failed to set the notifications as read", "error") })
        }
        else done()
    };

    const markAllNotificationsAsRead = async () => {
        const notificationsIds = getServerNotfications();
        markNotificationsAsRead(notificationsIds, true)
            .catch(() => { message("Failed to set all notifications as read", "error") })
    };

    const clearNotifications = () => {
        const notificationsIds = getServerNotfications();
        if (notificationsIds.length) {
            markNotificationsAsRead(notificationsIds)
                .then(clear)
                .catch(() => { message("Failed to clear all notifications", "error") })
        }
        else clear();
    };

    const notificationsEventSource = useEventSource("notifications");

    function addNotification(notification: Notification) {
        add({
            data: notification,
            id: notification._id,
            type: notification.type || "success"
        })
    }

    function notificationsHandler(messageEvent: MessageEvent<string>) {
        if (messageEvent.data) {
            const data = JSON.parse(messageEvent.data)
            if (data instanceof Array && data.length) {
                notifications.length && clear();
                data.forEach((notification) => { addNotification(notification) })
            } else {
                if (data._id) {
                    const notification = data as Notification
                    addNotification(notification)
                }
                notificationSound()
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
        clearNotifications,
        markAllNotificationsAsRead,
        markNotificationsAsRead,
        markAsRead,
        unreadNotificationsCount
    }
}
