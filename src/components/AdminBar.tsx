import { useState } from "react";
import { Menu } from '@mui/icons-material';
import { IconButton, Toolbar, Box, AppBar, Container } from '@mui/material';
import AdminSideBar from './AdminSideBar';
import { AMLogo } from "@abdulrhmangoni/am-store-library";
import NotificationsCenter from "./NotificationsCenter";
import { useLocation } from "react-router-dom";

export default function AdminAppBar() {

    const [drawerState, setDrawerState] = useState<boolean>(false);
    const { pathname } = useLocation();

    return (
        <Box>
            <AdminSideBar isOpen={drawerState} close={() => { setDrawerState(false) }} />
            <AppBar position='relative'>
                <Container
                    sx={{ px: "16px !important" }}
                    maxWidth={pagesSize[pathname] || false}
                >
                    <Toolbar sx={{ px: "0px !important" }}>
                        <IconButton onClick={() => { setDrawerState(true) }}><Menu sx={{ color: "text.primary" }} /></IconButton>
                        <AMLogo />
                        <Box sx={{ flexGrow: 1 }} />
                        <NotificationsCenter />
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

const pagesSize: { [path: string]: "md" } = {
    "/users-feedbacks": "md",
    "/products/edit-product": "md",
    "/products/add-products": "md",
    "/settings": "md",
    "/products/cobones-and-discounts": "md"
}