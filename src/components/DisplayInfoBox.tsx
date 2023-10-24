import { Box, Paper, Skeleton, Typography } from '@mui/material'
import SmallIconBox from './SmallIconBox'
import { CSSProperties } from '@mui/material/styles/createMixins'
import { PromiseState } from '../types/interfaces'

interface DisplayInfoBoxProps extends PromiseState {
    title: string
    icon: JSX.Element | string | number,
    body: string | number,
    bodyColor?: string,
    iconColor?: string,
    BoxStyle?: CSSProperties,
    type: "columnly" | "horizontally",
    disableIconColor?: boolean,
}

export default function DisplayInfoBox(props: DisplayInfoBoxProps) {
    const {
        title, body, icon, iconColor, BoxStyle,
        disableIconColor, isLoading, type,
        bodyColor
    } = props;

    const columnly: CSSProperties = {
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        gap: 1.5, p: 2,
    }

    const styleOfType = type === "columnly" ? columnly : { gap: 2, p: "8px 16px" }

    return (
        <Paper
            sx={{
                display: "flex",
                alignItems: "center",
                ...styleOfType,
                ...BoxStyle
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
                            <Typography variant="h6">{title}</Typography>
                            <Typography color={bodyColor} variant="h5">{body}</Typography>
                        </>
                }
            </Box>
        </Paper>
    )
}


