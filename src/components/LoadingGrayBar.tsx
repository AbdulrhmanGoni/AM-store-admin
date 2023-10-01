import { Skeleton, SkeletonPropsVariantOverrides } from "@mui/material";
import { SxProps } from "@mui/material/styles";

export type variant = "rou" | "cir" | "rec" | "tex"
export type LoadingGrayBarProps = { 
    type: variant, 
    sx?: SxProps, 
    width?: number | string, 
    height: number | string 
}

export default function LoadingGrayBar({ type, width, height, sx }: LoadingGrayBarProps) {

    const variant: SkeletonPropsVariantOverrides = {
        rou: "rounded",
        cir: "circular",
        rec: "rectangular",
        tex: "rectangular"
    }

    return (
        <Skeleton variant={variant[type]} sx={{ width, height, ...sx }} />
    )
}
