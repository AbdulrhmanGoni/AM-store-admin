import {
    Collapse, useTheme,
    List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, alpha,
} from '@mui/material';
import { useState, useEffect } from "react";
import sideBarLinks, { LinkProps } from './SideBarLinks';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowDropDown } from '@mui/icons-material';

interface LinkItemProps extends LinkProps {
    close?: () => void,
    onClick?: () => void,
    isParent?: boolean,
    isChild?: boolean,
    children?: any,
    endIcon?: any,
}

function isCurrentPath(target: string, pathname: string): boolean {
    const isTheRoot = target === "/"
    return !!(isTheRoot ? target === pathname : pathname.match(new RegExp(target, "gi")))
}

function LinkItem({ target, icon, text, close, onClick, isParent, isChild, children, endIcon }: LinkItemProps) {

    const pathname = usePathname();
    const { push } = useRouter();
    const { palette: { primary: { main }, mode, background: { paper }, text: { primary: txt } } } = useTheme();

    function whenClick() {
        onClick?.();
        if (!isParent) { push(target); close?.() }
    }

    const isCurr = isCurrentPath(target, pathname)
    let innerLinkColor = isCurr ? "#fff" : txt;
    let linkBg = isCurr ? `${main}` : paper;
    const itemSx = {
        color: innerLinkColor,
        bgcolor: linkBg,
        "&:hover": { bgcolor: isCurr ? undefined : alpha(main, .25) },
        borderBottom: "solid 1px",
        borderBottomColor: alpha(innerLinkColor, .2),
        borderRadius: 1,
        "& :is(svg, g, path)": {
            fill: innerLinkColor + '!important',
            color: innerLinkColor + '!important',
        }
    }

    const listItemDot = isChild ? {
        position: "relative",
        "&::before": {
            content: "' '",
            bgcolor: "primary.main",
            width: 10, height: 10,
            position: "absolute",
            left: 10, top: "50%",
            borderRadius: "50%",
            transform: "translateY(-50%)"
        }
    } : {}

    return (
        <>
            <ListItem disablePadding
                sx={{
                    width: 300,
                    pl: isChild ? 4 : "",
                    ...listItemDot,
                }}
            >
                <ListItemButton sx={itemSx} onClick={whenClick}>
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

    const pathname = usePathname();
    const [currentPath, setCurrentPath] = useState<string>("none");

    useEffect(() => { setCurrentPath(pathname) }, [])

    return (
        <List sx={listStyle} disablePadding>
            {sideBarLinks.map(({ target, text, icon, nestedLinks }) => {
                const
                    openChildren = isCurrentPath(target, currentPath),
                    hasChildren = !!nestedLinks?.length
                return (
                    <LinkItem
                        key={target} close={close}
                        onClick={() => { setCurrentPath((state) => state === target ? "none" : target) }}
                        icon={icon} text={text} target={target}
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
                                                key={link.target}
                                                close={close}
                                                icon={link.icon}
                                                text={link.text}
                                                target={`${target}/${link.target}`}
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