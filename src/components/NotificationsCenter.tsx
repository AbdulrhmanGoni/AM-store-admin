import { JSX } from "react";
import {
    Badge, IconButton, Popper, Fade,
    Button, Box, Paper, SxProps
} from "@mui/material";
import { Notifications } from "@mui/icons-material";
import { ActionAlert, P } from "@abdulrhmangoni/am-store-library";
import useNotificationsManager from "../hooks/useNotificationsManager";
import NotificationsList from "./NotificationsList";

export default function NotificationsCenter() {

    const {
        notifications,
        toggleNotificationsCenter,
        notificationsCenterIsOpen,
        anchorEl,
        clearNotifications,
        markAllNotificationsAsRead,
        markNotificationsAsRead,
        unreadNotificationsCount
    } = useNotificationsManager();

    return (
        <Box>
            <IconButton size="large" onClick={toggleNotificationsCenter}>
                <Badge badgeContent={unreadNotificationsCount} color="primary">
                    <Notifications color="action" />
                </Badge>
            </IconButton>
            <Popper
                open={notificationsCenterIsOpen}
                anchorEl={anchorEl}
                transition
                placement="bottom-end"
                sx={{ zIndex: 1000 }}
            >
                {({ TransitionProps }) => {
                    return (
                        <Fade {...TransitionProps} timeout={350}>
                            <Box sx={{ p: "10px" }}>
                                <FlexBar gap={1} justify="start" sx={{ borderBottomColor: "divider" }}>
                                    <P variant="h6" color="#fff">Notifications</P>
                                    <img
                                        src="/icons/notifications.svg"
                                        alt="Notifications icon"
                                        style={{ width: "30px", height: "30px" }}
                                    />
                                </FlexBar>
                                <NotificationsList
                                    notifications={notifications}
                                    markNotificationsAsRead={markNotificationsAsRead}
                                />
                                <FlexBar justify="between" sx={{ borderTopColor: "divider" }}>
                                    <ActionAlert
                                        action={clearNotifications}
                                        openingCondition={{ condition: !!notifications.length, enable: true }}
                                        title="Are you sure to clear all notifications?"
                                        message="You won't be able to see these notifications again if you clear them"
                                    >
                                        <Button
                                            color="error"
                                            sx={{ fontSize: "12px" }}
                                            size="small"
                                            variant="contained"
                                        >
                                            Clear All
                                        </Button>
                                    </ActionAlert>
                                    <Button
                                        size="small"
                                        sx={{ fontSize: "12px" }}
                                        variant="contained"
                                        onClick={markAllNotificationsAsRead}
                                    >
                                        Mark all as read
                                    </Button>
                                </FlexBar>
                            </Box>
                        </Fade>
                    )
                }}
            </Popper>
        </Box>
    );
}

interface FlexBarProps {
    children: JSX.Element[] | JSX.Element,
    sx?: SxProps,
    justify?: string
    gap?: number
}

function FlexBar({ children, sx, justify, gap = 2 }: FlexBarProps) {
    return (
        <Paper
            className={`flex-row-center-${justify} gap${gap}`}
            sx={{
                p: "8px 12px",
                borderRadius: 0,
                border: "solid 1px transparent",
                ...sx
            }}
        >
            {children}
        </Paper>
    )
}
