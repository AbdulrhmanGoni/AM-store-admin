import { LinearProgress } from '@mui/material';

export default function LoadingLine({ place, isLoading }: { isLoading: boolean, place: "bottom" | "top" }) {
    return (
        isLoading &&
        <LinearProgress sx={{ position: "absolute", left: 0, [place]: 0, width: "100%" }} />
    )
}
