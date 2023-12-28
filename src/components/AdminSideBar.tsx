import { useEffect } from 'react';
import { Close } from '@mui/icons-material';
import {
    Avatar, Divider,
    Paper,
    Drawer, IconButton
} from '@mui/material';
import useAdminData from '../hooks/useAdminData';
import SideBarLinksList from './SideBarLinksList';
import { P } from '@abdulrhmangoni/am-store-library';
import SwitchTheme from './SwitchTheme';



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
            PaperProps={{
                sx: {
                    p: "0px 5px",
                    bgcolor: "background.default",
                    backgroundImage: "none"
                }
            }}
        >
            <SwitchTheme style={{ position: "absolute", left: "25px", top: "15px" }} />
            <IconButton onClick={close} sx={{ position: "absolute", right: 2, top: 2 }}>
                <Close />
            </IconButton>
            <Paper className='flex-column-center gap1' sx={{ p: 2 }}>
                <Avatar src={adminData?.avatar} sx={{ width: "60px", height: "60px" }} />
                <P sx={{ display: { sm: "block", xs: "none" } }}>{adminData?.adminName}</P>
            </Paper>
            <Divider sx={{ bgcolor: "text.primary" }} />
            <SideBarLinksList close={close} />
        </Drawer>
    );
}
