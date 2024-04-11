import { ElementWithLoadingState, PromiseState } from "@abdulrhmangoni/am-store-library"
import pageSpaces from "../../CONSTANTS/pageSpaces"
import { Box } from "@mui/material"
import ProductImageInput from "./ProductImageInput"

interface ImagesInputsProps extends PromiseState {
    error: boolean,
    clearInputs?: boolean,
    defaultValue?: string[]
}

export default function ProductsImagesInputs({ error, clearInputs, defaultValue, isLoading }: ImagesInputsProps) {

    return (
        <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: pageSpaces,
            alignItems: "center",
            "& > *": { width: "100%", flexBasis: "50%", display: "flex", gap: pageSpaces }
        }}>
            <Box>
                <ElementWithLoadingState
                    height={120}
                    isLoading={isLoading}
                    element={<ProductImageInput defaultValue={defaultValue?.[0]} clear={clearInputs} name='image1' error={error} />}
                />
                <ElementWithLoadingState
                    height={120}
                    isLoading={isLoading}
                    element={<ProductImageInput defaultValue={defaultValue?.[1]} clear={clearInputs} name='image2' error={error} />}
                />
            </Box>
            <Box>
                <ElementWithLoadingState
                    height={120}
                    isLoading={isLoading}
                    element={<ProductImageInput defaultValue={defaultValue?.[2]} clear={clearInputs} name='image3' error={error} />}
                />
                <ElementWithLoadingState
                    height={120}
                    isLoading={isLoading}
                    element={<ProductImageInput defaultValue={defaultValue?.[3]} clear={clearInputs} name='image4' error={error} />}
                />
            </Box>
        </Box>
    )
}