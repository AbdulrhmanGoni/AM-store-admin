import { Skeleton } from "@mui/material";
import { SxProps } from "@mui/material/styles";

export type widthAndHeightType = number | string
export type LoadingGrayBarProps = { type: string, sx?: SxProps, w?: widthAndHeightType, h: widthAndHeightType }

export default function LoadingGrayBar({ type, w, h, sx }: LoadingGrayBarProps) {

    const variant = { rou: "rounded", cir: "circular", rec: "rectangular", tex: "rectangular" }

    return (
        <Skeleton variant={variant[type]} sx={{ width: w, height: h, ...sx }} />
    )
}
