import Image from 'next/image'
import { Box, Paper, Typography } from '@mui/material'

export default function TitleBarOfPage({ title, role }) {
    return (
        <Paper sx={{
            display: "flex",
            p: "16px 24px", mb: 2,
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
            position: "relative",
            
        }}>
            <Box>
                <Typography
                    variant='h5'
                    sx={{ mb: 1, position: "relative" }}>
                    {title}
                </Typography>
                <Typography variant='body1'>{role}</Typography>
            </Box>
            <img
                alt='bg'
                src="/images/blue-moon.jpg"
                style={{ width: "250px", height: "100%" }}
            />
        </Paper>
    )
}
