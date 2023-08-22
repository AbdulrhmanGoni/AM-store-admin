import Image from 'next/image'
import { Box, Paper, Typography } from '@mui/material'

export default function TitleBarOfPage({ title, role }) {
    return (
        <Paper sx={{
            display: "flex",
            p: "16px 24px",
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
            position: "relative",
            mb: 2
        }}>
            <Box>
                <Typography
                    variant='h5'
                    sx={{
                        mb: 1,
                        position: "relative",
                        // "&: before": {
                        //     content: "''",
                        //     position: "absolute",
                        //     bottom: -5,
                        //     left: 0,
                        //     width: "100%",
                        //     height: 5,
                        //     bgcolor: "primary.main"
                        // }
                    }}>
                    {title}
                </Typography>
                <Typography variant='body1'>{role}</Typography>
            </Box>
            <Image
                alt='bg'
                src={require("../images/1083.jpg")}
                style={{
                    width: "250px",
                    height: "100%",
                }}
            />
        </Paper>
    )
}
