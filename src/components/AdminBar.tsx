import { useState } from "react";
import { Notifications, Mail, Menu } from '@mui/icons-material';
import SwitchTheme from './SwitchTheme';
import { Avatar, Typography, IconButton, Toolbar, Box, AppBar, Badge } from '@mui/material';
import AdminSideBar from './AdminSideBar';

export default function AdminAppBar() {

    const [drawerState, setDrawerState] = useState(false);

    return (
        <Box>
            <AdminSideBar isOpen={drawerState} close={() => { setDrawerState(false) }} />
            <AppBar elevation={1} position='relative'>
                <Toolbar>
                    <IconButton onClick={() => { setDrawerState(true) }} >
                        <Menu sx={{ color: "white" }} />
                    </IconButton>
                    <IconButton
                        sx={{ width: 50, height: 50, p: 0, mr: 1 }}>
                        <Avatar src="https://live.staticflickr.com/65535/52735512062_1fb9bc6f2a_o.jpg">AM</Avatar>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        AM STORE
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <SwitchTheme />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="primary">
                                <Mail />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="primary">
                                <Notifications />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
