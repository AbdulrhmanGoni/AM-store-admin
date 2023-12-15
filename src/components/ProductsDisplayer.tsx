import { useEffect, useState, JSX } from "react"
import { Card, Typography, Box, IconButton, Rating, Button, ThemeProvider, Theme } from "@mui/material"
import { productData } from "../types/dataTypes"
import { Close, Delete, Edit, Remove } from "@mui/icons-material"
import {
    ActionAlert,
    ElementWithLoadingState,
    IllustrationCard,
    ProductImagesDisplayer,
    nDecorator,
    ProductAvailabationState,
    PriceDisplayer,
    AlertTooltip,
    loadingControl,

} from "@abdulrhmangoni/am-store-library"
import useProductsActions from "../hooks/useProductsActions"
import { CSSProperties } from "@mui/material/styles/createMixins"
import DiscountsApplyer from "./products-pages/DiscountsApplyer"
import useNotifications from "../hooks/useNotifications"

interface ProductsDisplayerProps {
    productId: string,
    close: () => void,
    navigate: () => void,
    theme: Theme
}

interface Product extends productData {
    _id: string,
    sold: number,
    earnings: number,
    discount?: number
}

export default function ProductsDisplayer({ productId, close, navigate, theme }: ProductsDisplayerProps) {

    const { getProduct, deleteProduct, removeDiscountFromProducts } = useProductsActions();
    const { message } = useNotifications();
    const [product, setProduct] = useState<Product>();
    const [productDiscount, setProductDiscount] = useState<number>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [cardsOpacity, setCardsOpacity] = useState<number>(0);

    useEffect(() => {
        if (!product) {
            setIsLoading(true)
            getProduct(productId)
                .then((data) => {
                    setProduct(data);
                    setProductDiscount(data?.discount)
                })
                .catch(() => { setIsError(true) })
                .finally(() => { setIsLoading(false) })
        }
    }, [getProduct, productId, product]);

    useEffect(() => { setCardsOpacity(1) }, [productId]);

    const { title, price, description, series, images, sold, earnings, _id, amount } = product ?? {}
    const actionAlertMessage = "Make sure if you continue, You will not be able to undo this process after that"

    function CloseIcon() {
        return (
            <IconButton
                onClick={() => { setCardsOpacity(0); close(); }}
                sx={closeIconStyle}
            >
                <Close />
            </IconButton>
        )
    }

    function removeDiscount() {
        loadingControl(true)
        _id && removeDiscountFromProducts([_id])
            .then(() => { setProductDiscount(0) })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Unexpected error happened";
                message(errorMessage, "error")
            })
            .finally(() => loadingControl(false))
    }

    return (
        <ThemeProvider theme={theme}>
            <Box id="product-displayer" className="flex-center" sx={containerStyle}>
                {
                    isError ? <ErrorHappend icon={<CloseIcon />} /> :
                        <Card className="flex-center" sx={{
                            ...cardStyle,
                            opacity: cardsOpacity,
                            flexDirection: { md: "row", xs: "column" }
                        }}>
                            <ProductImagesDisplayer
                                isLoading={isLoading}
                                images={images}
                            />
                            <Box className="flex-column" sx={infoSectionStyle}>
                                <ElementWithLoadingState isLoading={isLoading} height={40} width={300}
                                    element={<Typography variant="h6">{title}</Typography>}
                                />
                                <ElementWithLoadingState isLoading={isLoading} height={30} width={150}
                                    element={
                                        <Box className="flex-row a-end gap1">
                                            <Typography fontWeight="bold">Price:</Typography>
                                            <PriceDisplayer price={price || 0} discount={productDiscount} />
                                            {
                                                !!productDiscount &&
                                                <ActionAlert
                                                    action={() => { _id && removeDiscount() }}
                                                    title={"You are going to remove the discount on this product"}
                                                    message={actionAlertMessage}
                                                >
                                                    <div style={{ transform: "translate(-6px, -16px" }}>
                                                        <AlertTooltip type="warning" title="Remove the discount">
                                                            <IconButton size="small">
                                                                <Remove fontSize="small" sx={{ color: "red" }} />
                                                            </IconButton>
                                                        </AlertTooltip>
                                                    </div>
                                                </ActionAlert>
                                            }
                                        </Box>
                                    }
                                />
                                <ElementWithLoadingState isLoading={isLoading} height={25} width={250}
                                    element={
                                        <Box className="flex-row-center-start gap1">
                                            <Typography fontWeight="bold">Series:</Typography>
                                            <Typography>{series}</Typography>
                                        </Box>
                                    }
                                />
                                <ElementWithLoadingState isLoading={isLoading} height={27} width={100}
                                    element={
                                        <Box className="flex-row-center-start gap1">
                                            <Typography fontWeight="bold">Sold:</Typography>
                                            <Typography>{sold} times</Typography>
                                        </Box>
                                    }
                                />
                                <ElementWithLoadingState isLoading={isLoading} height={20} width={300}
                                    element={
                                        earnings ?
                                            <Box className="flex-row-center-start" gap={.5}>
                                                <Typography variant="subtitle1">This product achieves</Typography>
                                                <Typography color="success.main" variant="subtitle1">
                                                    ${nDecorator(earnings?.toFixed(2))}
                                                </Typography>
                                                <Typography variant="subtitle1">of earnings</Typography>
                                            </Box>
                                            : <Typography variant="subtitle1">
                                                This product has not been sold before
                                            </Typography>
                                    }
                                />
                                <ElementWithLoadingState isLoading={isLoading} height={30} width={170}
                                    element={
                                        <Box className="flex-row-center-start" gap={.5}>
                                            <Rating
                                                value={3} precision={.5} readOnly
                                                sx={{ ".MuiRating-iconEmpty": { color: "text.primary" } }}
                                            />
                                            <Typography variant="body2">(18) Rivews</Typography>
                                        </Box>
                                    }
                                />
                                <ElementWithLoadingState isLoading={isLoading} height={100}
                                    element={<Typography variant="body1">{description}</Typography>}
                                />
                                <ElementWithLoadingState isLoading={isLoading} height={100}
                                    element={
                                        <ProductAvailabationState
                                            visitAllAmount
                                            amount={amount ?? 0}
                                            style={{ width: "fit-content" }}
                                        />
                                    }
                                />
                                <ElementWithLoadingState isLoading={isLoading} height={60}
                                    element={
                                        <Box className="flex-row-center-start gap1" sx={{ mt: 1, flexFlow: "wrap" }}>
                                            <ActionAlert
                                                action={() => { _id ? deleteProduct(_id) : null }}
                                                title={"You are going to delete this product"}
                                                message={actionAlertMessage}                                >
                                                <Button
                                                    color="error"
                                                    variant="contained"
                                                    size="small"
                                                    startIcon={<Delete />}
                                                >
                                                    Delete
                                                </Button>
                                            </ActionAlert>
                                            <Button
                                                color="info"
                                                sx={{ color: "white" }}
                                                variant="contained"
                                                size="small"
                                                endIcon={<Edit />}
                                                onClick={() => { close(); navigate() }}
                                            >
                                                Edit
                                            </Button>
                                            {
                                                _id &&
                                                <DiscountsApplyer
                                                    productsIds={[_id]}
                                                    onDiscountApplyied={setProductDiscount}
                                                />
                                            }
                                        </Box>
                                    }
                                />
                            </Box>
                            <IconButton
                                onClick={() => { setCardsOpacity(0); close(); }}
                                sx={closeIconStyle}
                            >
                                <Close />
                            </IconButton>
                        </Card>
                }
            </Box>
        </ThemeProvider >
    )
}
function ErrorHappend({ icon }: { icon: JSX.Element }) {

    return <IllustrationCard
        paperStyle={{ ...cardStyle }}
        title="Unexpected error happend"
        illustratorType="unexpected"
        hideAlertMsg
        disableHeight
    >
        {icon}
    </IllustrationCard>
}

const containerStyle = {
    position: "fixed", bgcolor: "#00000060",
    width: "100%", height: "100vh",
    top: 0, left: 0, zIndex: 1000
}
const cardStyle: CSSProperties = {
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
    alignSelf: "flex-start",
    flexBasis: "50%",
    p: "12px", gap: 1,
}
