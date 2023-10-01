import { useEffect, useState } from "react"
import { Card, Typography, Box, IconButton, Rating, Button } from "@mui/material"
import useApiRequest from "@/hooks/useApiRequest"
import { productData } from "@/types/dataTypes"
import { Close, Delete, Edit } from "@mui/icons-material"
import { ActionAlert, nDecorator } from "@abdulrhmangoni/am-store-library"
import ProductImagesDisplayer from "@/app/products/components/ProductImagesDisplayer"
import useProductsActions from "../app/products/hooks/useProductsActions"
import ItemDisplayer from "./DisplayerItemWithLoadingState"


export default function ProductsDisplayer({ id, close, palette: { background, text } }) {

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

    return (
        <Box sx={containerStyle}>
            <Card sx={{ ...cardStyle, bgcolor: background.paper, color: text.primary, opacity: cardsOpacity }}>
                <ProductImagesDisplayer
                    isLoading={isLoading}
                    isError={isLoading}
                    images={images}
                />
                <Box sx={infoSectionStyle}>
                    <ItemDisplayer isLoading={isLoading} height={40}
                        item={<Typography key="tit" variant="h6">{title}</Typography>}
                    />
                    <ItemDisplayer isLoading={isLoading} height={20} width={200}
                        item={
                            <Box key="pri-sol" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Typography variant="subtitle1">Price: ${price?.toFixed(2)}</Typography>
                                <Typography variant="subtitle1">Sold: {sold}</Typography>
                            </Box>
                        }
                    />
                    <ItemDisplayer isLoading={isLoading} height={20} width={300}
                        item={
                            <Typography key="ear" variant="subtitle1">
                                {
                                    !!earnings ?
                                        `This product achieves $${nDecorator(earnings?.toFixed(2))} of earnings`
                                        : "This product has not been sold before"
                                }
                            </Typography>
                        }
                    />
                    <ItemDisplayer isLoading={isLoading} height={20} width={170}
                        item={
                            <Box key="rat" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Rating
                                    value={3} precision={.5} readOnly
                                    sx={{ ".MuiRating-iconEmpty": { color: text.primary } }}
                                />
                                <Typography variant="body2">(18) Rivews</Typography>
                            </Box>
                        }
                    />
                    <ItemDisplayer isLoading={isLoading} height={25} width={250}
                        item={<Typography key="ser" variant="subtitle1">Series: {series}</Typography>}
                    />
                    <ItemDisplayer isLoading={isLoading} height={100}
                        item={<Typography key="des" variant="body1">{description}</Typography>}
                    />
                    <ItemDisplayer isLoading={isLoading} height={60}
                        item={
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
                    <Close sx={{ color: text.primary }} />
                </IconButton>
            </Card>
        </Box>
    )
}

const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed", bgcolor: "#00000060",
    width: "100%", height: "100vh",
    top: 0, left: 0, zIndex: 1000
}
const cardStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    maxWidth: "1000px",
    width: "85%", p: 2,
    flexDirection: { md: "row", xs: "column" },
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
