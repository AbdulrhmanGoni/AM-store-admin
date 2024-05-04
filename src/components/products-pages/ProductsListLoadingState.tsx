import { rangeArray } from "@abdulrhmangoni/am-store-library";
import { alpha, ListItem, Skeleton, useTheme } from "@mui/material";

export default function ProductsListLoadingState({ length }: { length: number }) {

    const { palette: { primary } } = useTheme();

    return rangeArray(0, length).map(index => (
        <ListItem
            key={index}
            sx={{
                display: "flex",
                gap: 1,
                bgcolor: alpha(primary.main, .3),
                borderRadius: 1
            }}
        >
            <Skeleton variant="rounded" width={50} height={48} />
            <Skeleton variant="rounded" width="100%" height={48} />
        </ListItem>
    ))
}
