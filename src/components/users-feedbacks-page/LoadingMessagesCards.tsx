import { Box, Skeleton } from "@mui/material"

export default function LoadingMessagesCards({ cardsNumber }: { cardsNumber: number }) {
    return Array.from(Array(cardsNumber)).map((_, index) => {
        return (
            <Box key={index} className="flex-column gap1">
                <Box className="flex-row gap1 full-width" sx={{ p: 1.7 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box className="flex-column full-width gap1">
                        <Box className="flex-row full-width gap1">
                            <Skeleton variant="rounded" sx={{ flex: 1 }} height={14} />
                            <Skeleton variant="rounded" width={70} height={14} />
                        </Box>
                        <Skeleton variant="rounded" height={50} />
                    </Box>
                </Box>
            </Box>
        )
    })
}
