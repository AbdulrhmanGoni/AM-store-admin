import { Box, Paper, Skeleton } from '@mui/material'
import SmallIconBox from './SmallIconBox'
import { CSSProperties } from '@mui/material/styles/createMixins'
import { PromiseState } from '../types/interfaces'
import { P } from '@abdulrhmangoni/am-store-library'
import { ReactNode } from 'react'

interface DisplayInfoBoxProps extends PromiseState {
    title: string
    icon: JSX.Element | string | number,
    body: string | number,
    bodyColor?: string,
    iconColor?: string,
    boxStyle?: CSSProperties,
    type: "columnly" | "horizontally",
    disableIconColor?: boolean,
    children?: ReactNode
}

export default function DisplayInfoBox(props: DisplayInfoBoxProps) {
    const {
        title, body, icon, iconColor, boxStyle,
        disableIconColor, isLoading, type,
        bodyColor, children, isError
    } = props;

    const columnly: CSSProperties = {
        flexDirection: "column",
        textAlign: "center",
        gap: 1.5, p: 2,
    }

    const styleOfType = type === "columnly" ? columnly : { gap: 2, p: "8px 16px" }
    const errorStyle = isError && !isLoading ? { border: "solid 1px", borderColor: "error.main" } : undefined

    return (
        <Paper
            sx={{
                display: "flex",
                alignItems: "center",
                ...styleOfType,
                ...boxStyle,
                ...errorStyle
            }}
        >
            <SmallIconBox
                svgIconSize={30}
                color={iconColor}
                disableIconColor={disableIconColor}
                boxStyle={{ p: 1 }}
            >
                {isLoading ? <Skeleton variant="rounded" height={35} width={35} /> : icon}
            </SmallIconBox>
            <Box>
                {
                    isLoading ?
                        <>
                            <Skeleton variant="rounded" sx={{ mb: 1 }} height={25} width={100} />
                            <Skeleton variant="rounded" height={30} width={100} />
                        </>
                        :
                        <>
                            <P variant="h6">{title}</P>
                            <P color={bodyColor} variant="h5">{body}</P>
                        </>
                }
            </Box>
            {children}
        </Paper>
    )
}


