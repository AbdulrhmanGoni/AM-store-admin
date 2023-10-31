import { useEffect } from 'react';
import { Close } from '@mui/icons-material';
import {
    Avatar, Divider,
    Paper, Typography,
    Drawer, IconButton
} from '@mui/material';
import useAdminData from '../hooks/useAdminData';
import SideBarLinksList from './SideBarLinksList';

export default function AdminSideBar({ isOpen, close }: { isOpen: boolean, close: () => void }) {

    const adminData = useAdminData();

    useEffect(() => {
        document?.addEventListener("click", (event) => {
            const clickedElem = event.target as HTMLElement
            if (clickedElem) {
                clickedElem.classList.contains("MuiBackdrop-root") && close()
            }
        });
    }, []);

    return (
        <Drawer
            anchor='left' open={isOpen}
            sx={{ width: 300, position: "relative" }}
            aria-label="Admin Tools Bar"
            PaperProps={{
                sx: {
                    p: "0px 5px",
                    bgcolor: "background.default",
                    backgroundImage: "none"
                }
            }}
        >
            <IconButton onClick={close} sx={{ position: "absolute", right: 2, top: 2 }}><Close /></IconButton>
            <Paper sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1, p: 2,
            }}>
                <Avatar src={adminData?.avatar} sx={{ width: "60px", height: "60px" }} />
                <Typography sx={{ display: { sm: "block", xs: "none" } }}>{adminData?.adminName}</Typography>
            </Paper>
            <Divider sx={{ bgcolor: "text.primary" }} />
            <SideBarLinksList close={close} />
        </Drawer>
    );
}
