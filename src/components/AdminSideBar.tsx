import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    AnalyticsOutlined,
    Close,
    DiscountOutlined,
    Email, Inbox, Store
} from '@mui/icons-material';
import {
    Avatar, Divider, List,
    ListItem, ListItemButton,
    ListItemIcon, ListItemText,
    Paper, Typography, alpha,
    Drawer, useTheme, IconButton
} from '@mui/material';
import useAdminData from '@/hooks/useAdminData';


const linksStyle = { color: "inherit", width: "100%", textDecoration: "none" };
const drawerLinks = [
    { target: "/", text: "Dashboard", icon: <AnalyticsOutlined /> },
    { target: "/products-management", text: "Products Management", icon: <Store /> },
    { target: "/discounts", text: "Discounts", icon: <DiscountOutlined /> },
    { target: "/orders", text: "Orders", icon: <Inbox /> },
    { target: "/emails", text: "Emails", icon: <Email /> }
]
const backdropClass = "MuiBackdrop-root MuiModal-backdrop css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop";


export default function AdminSideBar({ isOpen, close }: { isOpen: boolean, close: () => void }) {

    const pathname = usePathname();
    const [adminData] = useAdminData();
    const { palette: { primary } } = useTheme();

    useEffect(() => {
        document?.addEventListener("click", (event) => {
            {/* @ts-ignore */ }
            event.target?.className === backdropClass && close?.()
        });
    }, []);

    return (
        <Drawer elevation={1}
            anchor='left'
            open={isOpen}
            sx={{ width: 265, position: "relative" }}
            aria-label="Admin Tools Bar"
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
            <List sx={{ pt: 0, pb: 0 }}>
                {drawerLinks.map(({ target, text, icon }) => {
                    let isCurr = pathname === target;
                    return (
                        <ListItem
                            sx={{
                                bgcolor: isCurr ? "primary.main" : null,
                                color: isCurr ? "white" : null,
                                width: '265px',
                            }}
                            key={target} disablePadding>
                            <Link href={target} as={target} style={linksStyle} onClick={close}>
                                <ListItemButton sx={{ "&:hover": { bgcolor: alpha(primary.main, .5) } }}>
                                    <ListItemIcon sx={{ minWidth: "33px", color: isCurr ? "white" : null }}>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    )
                })}
            </List>
        </Drawer>
    );
}
