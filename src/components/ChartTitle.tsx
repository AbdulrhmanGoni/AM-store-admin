import { Box, Typography } from '@mui/material'
import React from 'react'
import SmallIconBox from './SmallIconBox'
import { CSSProperties } from '@mui/material/styles/createMixins'

type ChartTitleProps = {
    icon: any,
    title: string,
    titleSize?: string,
    svgIconSize?: number
    containerStyle?: CSSProperties
    disableIconColor?: boolean
}

export default function ChartTitle({ icon, title, svgIconSize, titleSize, containerStyle, disableIconColor }: ChartTitleProps) {
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
                sx={{
                    fontSize: `${titleSize ?? "1.25rm"}`
                }}
            >
                {title}
            </Typography>
        </Box>
    )
}
