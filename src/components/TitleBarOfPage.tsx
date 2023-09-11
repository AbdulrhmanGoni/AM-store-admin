import Image from 'next/image'
import { Avatar, Box, Paper, Typography } from '@mui/material'

export default function TitleBarOfPage({ title, role }) {
    return (
        <Paper sx={{
            display: "flex", gap: 2,
            p: "16px 24px", mb: 2,
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
            position: "relative",
            flexFlow: "row wrap"
        }}>
            <Box>
                <Typography
                    variant='h5'
                    sx={{ mb: 1, position: "relative" }}>
                    {title}
                </Typography>
                <Typography variant='body1'>{role}</Typography>
            </Box>
            <Avatar
                alt='bg'
                src="/images/blue-moon.jpg"
                sx={{ width: "250px", height: "100%", borderRadius: 0 }}
            />
        </Paper>
    )
}
