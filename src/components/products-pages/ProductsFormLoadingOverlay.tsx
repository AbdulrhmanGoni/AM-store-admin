import { LinearProgress } from '@mui/material'
import DarkOverlay from '../DarkOverlay'

export default function ProductsFormLoadingOverlay({ isLoading }: { isLoading?: boolean }) {
    return (
        <>
            <LinearProgress sx={{
                display: isLoading ? "block" : "none",
                position: "absolute",
                width: "100%",
                left: 0,
                top: 0
            }}
            />
            <DarkOverlay
                style={{
                    zIndex: isLoading ? 10 : 0,
                    display: isLoading ? "flex" : "none",
                    borderRadius: .5
                }}
            />
        </>
    )
}
