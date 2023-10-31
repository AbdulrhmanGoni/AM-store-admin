import { JSX } from 'react'
import { Box, Typography } from '@mui/material'
import SmallIconBox from './SmallIconBox'

interface PageTitleProps {
    title: string,
    description: string,
    icon?: JSX.Element
}
export default function PageTitle({ title, description, icon }: PageTitleProps) {
    return (
        <Box>
            <Typography
                variant='h5'
                sx={{ mb: 1, position: "relative", display: "flex", alignItems: "center", gap: 1.5 }}>
                {title}
                <SmallIconBox
                    icon={icon}
                    svgIconSize={25}
                    boxStyle={{ p: .3 }}
                />
            </Typography>
            <Typography variant='body1'>{description}</Typography>
        </Box>
    )
}
