import { PromiseState } from "@/types/interfaces";
import LoadingGrayBar from "./LoadinGrayBar";

interface DisplayerItemWithLoadingStateProps extends PromiseState {
    item: JSX.Element,
    width?: number | string,
    height: number | string
}

export default function DisplayerItemWithLoadingState({ item, width, height, isLoading }: DisplayerItemWithLoadingStateProps) {
    return isLoading ? <LoadingGrayBar
        width={width ?? "100%"}
        height={height}
        type="rou"
        sx={{ bgcolor: "rgb(0 0 0 / 20%)" }} />
        :
        item
}