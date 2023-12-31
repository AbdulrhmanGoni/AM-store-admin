import { useEffect, useState } from 'react'
import useEventSource from './useEventSource';
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';
import { Id, TypeOptions } from 'react-toastify';
import useApiRequest from './useApiRequest';
import host from '../CONSTANTS/API_hostName';
import useNotifications from './useNotifications';
import { AxiosResponse } from 'axios';

export interface Notification {
    _id: string,
    title: string,
    description: string,
    type: TypeOptions,
    createdAt: string
}

export type MarkNotificationsAsReadType = (id: Id[], markAll?: boolean) => Promise<AxiosResponse>

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

    const markNotificationsAsRead: MarkNotificationsAsReadType = async (notificationsIds, markAll) => {
        return await api.post(`${host}/notifications`, { notificationsIds })
            .then((res) => {
                if (markAll) markAllAsRead();
                else markAsRead(notificationsIds);
                return res
            })
    };

    const markAllNotificationsAsRead = async () => {
        const notificationsIds = notifications.map(notifications => notifications.id);
        markNotificationsAsRead(notificationsIds, true)
            .catch(() => { message("Failed to set all notifications as read", "error") })
    };

    const clearNotifications = () => {
        const unreadNotifications = notifications.filter(({ read }) => !read);
        if (unreadNotifications.length) {
            const notificationsIds = unreadNotifications.map(({ id }) => id);
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
            if (data instanceof Array) {
                notifications.length && clear();
                data.forEach((notification) => { addNotification(notification) })
            } else {
                if (data._id) {
                    const notification = data as Notification
                    addNotification(notification)
                }
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
