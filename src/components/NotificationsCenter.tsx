import { JSX } from "react";
import {
    Badge, IconButton, Popper, Fade, Switch,
    Button, FormGroup, FormControlLabel, Box, Paper, SxProps
} from "@mui/material";
import { Mail } from "@mui/icons-material";
import { ActionAlert, P } from "@abdulrhmangoni/am-store-library";
import useNotificationsManager from "../hooks/useNotificationsManager";
import NotificationsList from "./NotificationsList";

export default function NotificationsCenter() {

    const {
        notifications,
        toggleNotificationsCenter,
        notificationsCenterIsOpen,
        anchorEl,
        toggleFilter,
        clearNotifications,
        markAllAsRead,
        markAsRead,
        unreadNotificationsCount,
        showUnreadNotificationsOnly
    } = useNotificationsManager();

    return (
        <Box>
            <IconButton size="large" onClick={toggleNotificationsCenter}>
                <Badge badgeContent={unreadNotificationsCount} color="primary">
                    <Mail color="action" />
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
                                <FlexBar sx={{ borderBottom: "1px solid", borderBottomColor: "divider" }}>
                                    <P variant="h6" color="#fff">Notification</P>
                                    <FormGroup sx={{ color: "#fff", "& .MuiFormControlLabel-root": { mr: 0 } }}>
                                        <FormControlLabel
                                            label="Unread only"
                                            sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                                            control={
                                                <Switch
                                                    onChange={toggleFilter}
                                                    checked={showUnreadNotificationsOnly}
                                                    size="small"
                                                />
                                            }
                                        />
                                    </FormGroup>
                                </FlexBar>
                                <NotificationsList
                                    notifications={notifications}
                                    showUnreadNotificationsOnly={showUnreadNotificationsOnly}
                                    unreadNotificationsCount={unreadNotificationsCount}
                                    markAsRead={markAsRead}
                                />
                                <FlexBar sx={{ borderTop: "1px solid", borderTopColor: "divider" }}>
                                    <ActionAlert
                                        action={clearNotifications}
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
                                        onClick={markAllAsRead}
                                    >
                                        Mark all as read
                                    </Button>
                                </FlexBar>
                            </Box>
                        </Fade>
                    )
                }}
            </Popper>
        </Box >
    );
}

function FlexBar({ children, sx }: { children: JSX.Element[] | JSX.Element, sx?: SxProps }) {
    return (
        <Paper
            className="flex-row-center-between gap2"
            sx={{
                p: "8px 12px",
                borderRadius: 0,
                ...sx
            }}
        >
            {children}
        </Paper>
    )
}
