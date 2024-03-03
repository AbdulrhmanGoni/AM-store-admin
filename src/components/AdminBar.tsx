import { useState } from "react";
import { Menu } from '@mui/icons-material';
import { IconButton, Toolbar, Box, AppBar } from '@mui/material';
import AdminSideBar from './AdminSideBar';
import { AMLogo } from "@abdulrhmangoni/am-store-library";
import NotificationsCenter from "./NotificationsCenter";

export default function AdminAppBar() {

    const [drawerState, setDrawerState] = useState(false);

    return (
        <Box>
            <AdminSideBar isOpen={drawerState} close={() => { setDrawerState(false) }} />
            <AppBar position='relative'>
                <Toolbar>
                    <IconButton onClick={() => { setDrawerState(true) }} ><Menu /></IconButton>
                    <AMLogo />
                    <Box sx={{ flexGrow: 1 }} />
                    <NotificationsCenter />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
