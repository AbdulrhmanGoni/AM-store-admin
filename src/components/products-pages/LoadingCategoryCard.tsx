import { Box, Skeleton } from '@mui/material'


export default function LoadingCategoryCard() {

    const rowClass = "flex-row-center-between full-width";

    function Bar({ w, h, circle }: { w: number, h: number, circle?: boolean }) {
        return <Skeleton variant={circle ? "circular" : "rounded"} width={w} height={h} />
    }

    return Array.from(Array(3)).map((_, i) => {
        return (
            <Box
                key={i}
                className="flex-column-center gap1"
                sx={{
                    maxHeight: "160px",
                    minWidth: "190px",
                    borderRadius: 1,
                    p: 1, flex: 1
                }}>
                <Box sx={{ mb: 1 }} className={rowClass}>
                    <Box className="flex-row-center-start gap1">
                        <Bar circle w={17} h={17} />
                        <Bar w={80} h={18} />
                    </Box>
                    <Bar w={45} h={18} />
                </Box>
                <Box className={rowClass}>
                    <Bar w={70} h={17} />
                    <Bar w={55} h={17} />
                </Box>
                <Box className={rowClass}>
                    <Bar w={110} h={17} />
                    <Bar w={40} h={17} />
                </Box>
                <Box className={rowClass}>
                    <Bar w={100} h={17} />
                    <Bar w={40} h={17} />
                </Box>
            </Box>
        )
    })
}
