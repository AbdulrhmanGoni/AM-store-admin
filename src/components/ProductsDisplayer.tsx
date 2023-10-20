import { useEffect, useState, JSX } from "react"
import { Card, Typography, Box, IconButton, Rating, Button } from "@mui/material"
import { productData } from "@/types/dataTypes"
import { Close, Delete, Edit } from "@mui/icons-material"
import {
    ActionAlert,
    ElementWithLoadingState,
    ErrorThrower,
    ProductImagesDisplayer,
    nDecorator
} from "@abdulrhmangoni/am-store-library"
import useProductsActions from "../app/products/hooks/useProductsActions"
import { CSSProperties } from "@mui/material/styles/createMixins"


export default function ProductsDisplayer({ id, close, bgColor, textColor }) {

    const { getProduct, deleteProduct } = useProductsActions();
    const [product, setProduct] = useState<productData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [cardsOpacity, setCardsOpacity] = useState<number>(0);

    function fetchProduct(productId: string) {
        setIsLoading(true)
        getProduct(productId)
            .then((data) => { setProduct(data) })
            .catch(() => { setIsError(true) })
            .finally(() => { setIsLoading(false) })
    }

    useEffect(() => { !product && fetchProduct(id) }, [id]);
    useEffect(() => { setCardsOpacity(1) }, [id]);

    const { title, price, description, series, images, sold, earnings, _id } = product ?? {}

    function CloseIcon() {
        return (
            <IconButton
                onClick={() => { setCardsOpacity(0); close(); }}
                sx={closeIconStyle}
            >
                <Close sx={{ color: textColor }} />
            </IconButton>
        )
    }

    return (
        <Box sx={containerStyle}>
            {
                isError ? <ErrorHappend
                    icon={<CloseIcon />}
                    bgColor={bgColor}
                    textColor={textColor}
                /> :
                    <Card sx={{
                        ...cardStyle,
                        bgcolor: bgColor,
                        color: textColor,
                        opacity: cardsOpacity,
                        flexDirection: { md: "row", xs: "column" }
                    }}>
                        <ProductImagesDisplayer
                            isLoading={isLoading}
                            images={images}
                        />
                        <Box sx={infoSectionStyle}>
                            <ElementWithLoadingState isLoading={isLoading} height={40} width={300}
                                element={<Typography key="tit" variant="h6">{title}</Typography>}
                            />
                            <ElementWithLoadingState isLoading={isLoading} height={20} width={200}
                                element={
                                    <Box key="pri-sol" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Typography variant="subtitle1">Price: ${price?.toFixed(2)}</Typography>
                                        <Typography variant="subtitle1">Sold: {sold}</Typography>
                                    </Box>
                                }
                            />
                            <ElementWithLoadingState isLoading={isLoading} height={20} width={300}
                                element={
                                    <Typography key="ear" variant="subtitle1">
                                        {
                                            !!earnings ?
                                                `This product achieves $${nDecorator(earnings?.toFixed(2))} of earnings`
                                                : "This product has not been sold before"
                                        }
                                    </Typography>
                                }
                            />
                            <ElementWithLoadingState isLoading={isLoading} height={20} width={170}
                                element={
                                    <Box key="rat" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Rating
                                            value={3} precision={.5} readOnly
                                            sx={{ ".MuiRating-iconEmpty": { color: textColor } }}
                                        />
                                        <Typography variant="body2">(18) Rivews</Typography>
                                    </Box>
                                }
                            />
                            <ElementWithLoadingState isLoading={isLoading} height={25} width={250}
                                element={<Typography key="ser" variant="subtitle1">Series: {series}</Typography>}
                            />
                            <ElementWithLoadingState isLoading={isLoading} height={100}
                                element={<Typography key="des" variant="body1">{description}</Typography>}
                            />
                            <ElementWithLoadingState isLoading={isLoading} height={60}
                                element={
                                    <Box key="act" sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
                                        <ActionAlert
                                            action={() => { _id ? deleteProduct(_id) : null }}
                                            title={"You are going to delete the product"}
                                            message={"Make sure if you continue, You will not be able to undo this process after that"}                                >
                                            <Button color="error" variant="contained" size="small" startIcon={<Delete />} >Delete</Button>
                                        </ActionAlert>
                                        <Button
                                            color="info"
                                            variant="contained"
                                            size="small"
                                            endIcon={<Edit />}
                                        // onClick={async () => { close(); push(`products/edit-product/${_id}`) }}
                                        >
                                            Edit
                                        </Button>
                                    </Box>
                                }
                            />
                        </Box>
                        <IconButton
                            onClick={() => { setCardsOpacity(0); close(); }}
                            sx={closeIconStyle}
                        >
                            <Close sx={{ color: textColor }} />
                        </IconButton>
                    </Card>
            }
        </Box>
    )
}
function ErrorHappend({ icon, bgColor, textColor }: { icon: JSX.Element, bgColor: string, textColor: string }) {

    return <ErrorThrower
        paperStyle={{
            ...cardStyle,
            backgroundColor: bgColor,
            color: textColor
        }}
        title="Unexpected error happend"
        illustratorType="unexpected"
        hideAlertMsg
        disableHeight
    >
        {icon}
    </ErrorThrower>
}

const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed", bgcolor: "#00000060",
    width: "100%", height: "100vh",
    top: 0, left: 0, zIndex: 1000
}
const cardStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    maxWidth: "1000px",
    width: "85%", p: 2,
    transition: ".2s"
}
const closeIconStyle = {
    position: "absolute",
    top: 0, right: 0
}
const infoSectionStyle = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    flexBasis: "50%",
    p: "12px", gap: 1,
}
