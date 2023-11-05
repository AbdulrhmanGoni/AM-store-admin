import { Typography, TypographyOwnProps } from '@mui/material'

export interface PProps extends TypographyOwnProps {
    className?: string
}

export default function P(props: PProps) {
    return (
        <Typography {...props} />
    )
}
