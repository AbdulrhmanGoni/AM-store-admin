import { JSX } from 'react'
import { Box, SxProps } from '@mui/material'
import SmallIconBox from './SmallIconBox'
import { P } from '@abdulrhmangoni/am-store-library'

interface PageTitleProps {
    title: string,
    description: string,
    icon?: JSX.Element
    iconSize?: number
    containerSX?: SxProps
}
export default function PageTitle({ title, description, icon, iconSize = 23, containerSX }: PageTitleProps) {
    return (
        <Box sx={containerSX}>
            <P
                variant='h5'
                className='flex-row-center-start'
                sx={{
                    mb: 1,
                    position: "relative",
                    gap: 1.5,
                    fontWeight: "bold"
                }}>
                {title}
                {
                    icon &&
                    <SmallIconBox
                        icon={icon}
                        svgIconSize={iconSize}
                        boxStyle={{ p: .3 }}
                    />
                }
            </P>
            <P variant='body1'>{description}</P>
        </Box>
    )
}
