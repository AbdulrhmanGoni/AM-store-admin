import { useState } from "react";
import { Menu } from '@mui/icons-material';
import { Avatar, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import AdminSideBar from './AdminSideBar';
import { P } from "@abdulrhmangoni/am-store-library";
import NotificationsCenter from "./NotificationsCenter";

export default function AdminAppBar() {

    const [drawerState, setDrawerState] = useState(false);

    return (
        <Box>
            <AdminSideBar isOpen={drawerState} close={() => { setDrawerState(false) }} />
            <AppBar position='relative'>
                <Toolbar>
                    <IconButton onClick={() => { setDrawerState(true) }} ><Menu /></IconButton>
                    <IconButton
                        sx={{ width: 50, height: 50, p: 0, mr: 1 }}>
                        <Avatar src="https://live.staticflickr.com/65535/52735512062_1fb9bc6f2a_o.jpg">AM</Avatar>
                    </IconButton>
                    <P
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: "bold" }}
                    >
                        AM STORE
                    </P>
                    <Box sx={{ flexGrow: 1 }} />
                    <NotificationsCenter />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
