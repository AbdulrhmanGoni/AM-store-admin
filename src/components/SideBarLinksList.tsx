import {
    Collapse, useTheme,
    List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, alpha,
} from '@mui/material';
import { useState, useEffect, MouseEvent } from "react";
import sideBarLinks, { LinkProps } from './SideBarLinks';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowDropDown } from '@mui/icons-material';

interface LinkItemProps extends LinkProps {
    close?: () => void,
    onClick?: () => void,
    isParent?: boolean,
    isChild?: boolean,
    children?: JSX.Element | false,
    endIcon?: JSX.Element | false,
}

function isCurrentPath(path: string, pathname: string, isParent?: boolean): boolean {
    const activeChildren = isParent && pathname.match(new RegExp(path, "gi"))
    return !!(path === pathname || activeChildren)
}

function LinkItem({ path, icon, text, close, onClick, isParent, isChild, children, endIcon }: LinkItemProps) {

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { palette: { primary: { main }, background: { paper }, text: { primary: txt } } } = useTheme();

    function whenClick(event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) {
        event.preventDefault()
        onClick?.();
        if (!isParent) { navigate(path); close?.() }
        return false
    }

    const isCurr = isCurrentPath(path, pathname, isParent)
    let innerLinkColor = isCurr ? "#fff" : txt;
    innerLinkColor += " !important"
    const linkBg = isCurr ? `${main}` : paper;
    const itemSx = {
        "& span.MuiListItemText-primary": { color: innerLinkColor },
        bgcolor: linkBg,
        "&:hover": { bgcolor: isCurr ? undefined : alpha(main, .25) },
        borderBottom: `solid 1px ${alpha(txt, .2)}`,
        borderRadius: 1,
        "& :is(svg, g, path)": {
            fill: innerLinkColor,
            color: innerLinkColor
        }
    }

    const listItemDot = isChild ? {
        position: "relative",
        "&::before": {
            content: "' '",
            bgcolor: isCurr ? "primary.main" : "text.primary",
            width: 10, height: 10,
            position: "absolute",
            left: 10, top: "50%",
            borderRadius: "50%",
            transform: "translateY(-50%)"
        }
    } : {}

    return (
        <>
            <ListItem
                disablePadding
                sx={{
                    width: 300,
                    pl: isChild ? 4 : "",
                    ...listItemDot,
                }}
            >
                <ListItemButton href={path} LinkComponent={"a"} sx={itemSx} onClick={(e) => whenClick(e)}>
                    <ListItemIcon sx={{ minWidth: "33px" }}>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                    {endIcon}
                </ListItemButton>
            </ListItem>
            {children}
        </>
    )
}

export default function SideBarLinksList({ close }: { close: () => void }) {

    const { pathname } = useLocation();
    const [currentPath, setCurrentPath] = useState<string>("none");

    useEffect(() => { setCurrentPath(pathname) }, [pathname])

    return (
        <List sx={listStyle} disablePadding>
            {sideBarLinks.map(({ path, text, icon, nestedLinks }) => {
                const
                    hasChildren = !!nestedLinks?.length,
                    openChildren = isCurrentPath(path, currentPath, hasChildren)
                return (
                    <LinkItem
                        key={path} close={close}
                        onClick={() => { setCurrentPath((state) => state === path ? "none" : path) }}
                        icon={icon} text={text} path={path}
                        isParent={hasChildren}
                        endIcon={
                            hasChildren &&
                            <ArrowDropDown
                                sx={{
                                    transition: ".3s",
                                    transform: openChildren ? "rotate(180deg)" : "none"
                                }}
                            />
                        }
                    >
                        {
                            !!nestedLinks &&
                            <Collapse in={openChildren} timeout="auto" unmountOnExit>
                                <List sx={listStyle} disablePadding>
                                    {nestedLinks?.map(link => {
                                        return (
                                            <LinkItem
                                                key={link.path}
                                                close={close}
                                                icon={link.icon}
                                                text={link.text}
                                                path={`${path}/${link.path}`}
                                                isChild
                                            />
                                        )
                                    })}
                                </List>
                            </Collapse>
                        }
                    </LinkItem>
                )
            })}
        </List>
    )
}

const listStyle = { display: "flex", flexDirection: "column", gap: .5 }