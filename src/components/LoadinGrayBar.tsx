import { Skeleton, SkeletonPropsVariantOverrides } from "@mui/material";
import { SxProps } from "@mui/material/styles";

export type widthAndHeightType = number | string
export type variant = "rou" | "cir" | "rec" | "tex"
export type LoadingGrayBarProps = { type: variant, sx?: SxProps, w?: widthAndHeightType, h: widthAndHeightType }

export default function LoadingGrayBar({ type, w, h, sx }: LoadingGrayBarProps) {

    const variant: SkeletonPropsVariantOverrides = {
        rou: "rounded",
        cir: "circular",
        rec: "rectangular",
        tex: "rectangular"
    }

    return (
        <Skeleton variant={variant[type]} sx={{ width: w, height: h, ...sx }} />
    )
}
