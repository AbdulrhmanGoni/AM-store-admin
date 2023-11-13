import { Box, Typography } from '@mui/material'
import { JSX } from 'react'
import SmallIconBox from './SmallIconBox'
import { CSSProperties } from '@mui/material/styles/createMixins'

type ChartTitleProps = {
    icon: JSX.Element,
    endItem?: JSX.Element,
    title: string,
    titleSize?: string,
    svgIconSize?: number
    containerStyle?: CSSProperties
    disableIconColor?: boolean
}

export default function ChartTitle(props: ChartTitleProps) {

    const { icon, title, endItem, svgIconSize, titleSize, containerStyle, disableIconColor } = props

    return (
        <Box sx={{
            display: "flex",
            gap: 1.5, p: 1,
            alignItems: "center",
            ...containerStyle
        }}>
            <SmallIconBox
                svgIconSize={svgIconSize ?? 20}
                boxStyle={{ p: .5 }}
                disableIconColor={disableIconColor}
                icon={icon}
            />
            <Typography
                variant="h6"
                sx={{ fontSize: `${titleSize ?? "1.25rm"}`, flex: 1 }}
            >
                {title}
            </Typography>
            {endItem}
        </Box>
    )
}
