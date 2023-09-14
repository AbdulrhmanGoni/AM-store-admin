import { Box, Typography } from '@mui/material'
import React from 'react'
import SmallIconBox from './SmallIconBox'

type ChartTitleProps = {
    icon: any,
    title: string,
}

export default function ChartTitle({ icon, title }: ChartTitleProps) {
    return (
        <Box sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "center",
            p: 1
        }}>
            <SmallIconBox
                svgIconSize={20}
                boxStyle={{ p: .5 }}
                icon={icon}
            />
            <Typography variant="h6">{title}</Typography>
        </Box>
    )
}
