import { useEffect, useState, JSX } from "react"
import { Card, Box, IconButton, Rating, Button, ThemeProvider, Theme } from "@mui/material"
import { productFullType } from "../types/dataTypes"
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
    HighlightedWord,
    P
} from "@abdulrhmangoni/am-store-library"
import useProductsActions from "../hooks/useProductsActions"
import { CSSProperties } from "@mui/material/styles/createMixins"
import DiscountsApplyer from "./products-pages/DiscountsApplyer"
import useNotifications from "../hooks/useNotifications"
import pageSpaces from "../CONSTANTS/pageSpaces"

interface ProductsDisplayerProps {
    productId: string,
    close: () => void,
    navigate: () => void,
    theme: Theme
}

export default function ProductsDisplayer({ productId, close, navigate, theme }: ProductsDisplayerProps) {

    const { getProduct, deleteProduct, removeDiscountFromProducts } = useProductsActions();
    const { message } = useNotifications();
    const [product, setProduct] = useState<productFullType>();
    const [productDiscount, setProductDiscount] = useState<number>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [cardsOpacity, setCardsOpacity] = useState<number>(0);

    useEffect(() => {
        if (!product) {
            const controller = new AbortController();
            const signal = controller.signal;
            setIsLoading(true)
            getProduct(productId, signal)
                .then((data) => {
                    setProduct(data);
                    setProductDiscount(data?.discount)
                })
                .catch(() => { setIsError(true) })
                .finally(() => { setIsLoading(false) })

            return () => { controller.abort() }
        }
    }, [productId]);

    useEffect(() => { setCardsOpacity(1) }, [productId]);

    const { title, price, description, series, images, sold, earnings, _id, amount, rating } = product ?? {}
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
            <Box
                id="product-displayer"
                className="flex-row-center"
                sx={{ ...containerStyle, alignItems: { xs: "flex-start", md: "center" } }}
            >
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
                                    element={<P variant="h6">{title}</P>}
                                />
                                <ElementWithLoadingState isLoading={isLoading} height={30} width={150}
                                    element={
                                        <Box className="flex-row a-end gap1">
                                            <P fontWeight="bold">Price:</P>
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
                                            <P fontWeight="bold">Series:</P>
                                            <HighlightedWord
                                                variant="subtitle1"
                                                highlightColor="primary"
                                            >
                                                {`${series}`}
                                            </HighlightedWord>
                                        </Box>
                                    }
                                />
                                <ElementWithLoadingState isLoading={isLoading} height={27} width={100}
                                    element={
                                        <Box className="flex-row-center-start gap1">
                                            <P fontWeight="bold">Sold:</P>
                                            <HighlightedWord
                                                variant="subtitle1"
                                                highlightColor="#00ff0c"
                                            >
                                                {`${sold} times`}
                                            </HighlightedWord>
                                        </Box>
                                    }
                                />
                                <ElementWithLoadingState isLoading={isLoading} height={20} width={300}
                                    element={
                                        earnings ?
                                            <Box className="flex-row-center-start" columnGap={.5}>
                                                <P variant="subtitle1">This product achieves</P>
                                                <P variant="subtitle1" color="#00ff0c">
                                                    {`$${nDecorator(earnings?.toFixed(2))}`}
                                                </P>
                                                <P variant="subtitle1">of earnings</P>
                                            </Box>
                                            : <P variant="subtitle1">
                                                This product has not been sold before
                                            </P>
                                    }
                                />
                                <ElementWithLoadingState isLoading={isLoading} height={30} width={170}
                                    element={
                                        <Box className="flex-row-center-start" gap={.5}>
                                            <Rating
                                                value={rating?.ratingAverage}
                                                precision={.5}
                                                readOnly
                                                sx={{ ".MuiRating-iconEmpty": { color: "text.primary" } }}
                                            />
                                            <P>({rating?.reviews || 0}) Rivews</P>
                                        </Box>
                                    }
                                />
                                <ElementWithLoadingState isLoading={isLoading} height={100}
                                    element={<P variant="body1">{description}</P>}
                                />
                                <ElementWithLoadingState isLoading={isLoading} width={60} height={30}
                                    element={
                                        <ProductAvailabationState
                                            visitAllAmount
                                            amount={amount ?? 0}
                                            style={{ width: "fit-content" }}
                                        />
                                    }
                                />
                                <ElementWithLoadingState isLoading={isLoading} height={50}
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
    overflowY: "auto", zIndex: 1000,
    top: 0, left: 0, p: pageSpaces
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
