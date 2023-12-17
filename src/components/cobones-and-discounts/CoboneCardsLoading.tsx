import { Paper, Skeleton } from "@mui/material";


export default function CoboneCardsLoading() {
    return (
        [1, 2, 3, 4, 5].map((number) => (
            <Paper
                key={number}
                sx={{ height: "46px", p: 1 }}
                className="flex-row-center-start full-width gap1"
            >
                <Skeleton variant="rounded" sx={{ flex: 3, height: "100%" }} />
                <Skeleton variant="rounded" sx={{ flex: 1.3, width: "90px", height: "100%" }} />
                <Skeleton variant="rounded" sx={{ width: "20px", height: "28px" }} />
            </Paper>
        ))
    )
}

