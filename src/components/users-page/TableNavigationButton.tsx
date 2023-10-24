import { EastOutlined, WestOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"


interface NavigationButtonProps {
    direction: "previous" | "next",
    page: number,
    isThereNextPage: boolean,
    isLoading?: boolean,
    navigate: (to: "previous" | "next") => void
}

export default function TableNavigationButton({ direction, page, navigate, isThereNextPage, isLoading }: NavigationButtonProps) {
    return (
        <IconButton
            size="small"
            disabled={
                page === 1 && direction === "previous"
                || !isLoading && !isThereNextPage && direction === "next"
            }
            onClick={() => { navigate(direction) }}
        >
            {
                direction === "next" ?
                    <EastOutlined sx={{ fontSize: "20px" }} />
                    : <WestOutlined sx={{ fontSize: "20px" }} />
            }
        </IconButton>
    )
}
