import { useEffect, useState } from "react"
import { Card, Typography, Box, IconButton, Rating, Button } from "@mui/material"
import { host_admin } from "@/CONSTANT/API_hostName"
import useApiRequest from "@/hooks/useApiRequest"
import { productData } from "@/types/dataTypes"
import { Close, Delete, Edit } from "@mui/icons-material"
import LoadingGrayBar, { widthAndHeightType as wh } from "./LoadinGrayBar"
import { ActionAlert, nDecorator } from "@abdulrhmangoni/am-store-library"
import ProductImagesDisplayer from "@/app/products/components/ProductImagesDisplayer"


export default function ProductsDisplayer({ id, close, palette: { background, text, primary } }) {

    const { api } = useApiRequest();
    const [product, setProduct] = useState<productData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [cardsOpacity, setCardsOpacity] = useState<number>(0);

    async function deleteProduct(productId: string) {
        return (await api.delete(`${host_admin}products/${productId}`, { data: productId })).data
    }

    function fetchProduct() {
        setIsLoading(true)
        api.get(`${host_admin}products/${id}`)
            .then(({ data }) => { setProduct(data) })
            .catch(() => { setIsError(true) })
            .finally(() => { setIsLoading(false) })
    }

    useEffect(fetchProduct, [id]);
    useEffect(() => { setCardsOpacity(1) }, [id]);

    function ItemDisplayer({ item, lw, lh }: { item: any, lw?: wh, lh: wh }) {
        return isLoading ? <LoadingGrayBar w={lw ?? "100%"} h={lh} type="rou" sx={{ bgcolor: "rgb(0 0 0 / 20%)" }} />
            : isError ? null : [item]
    }

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
                    <ItemDisplayer lh={40}
                        item={<Typography key="tit" variant="h6">{title}</Typography>}
                    />
                    <ItemDisplayer lh={20} lw={200}
                        item={
                            <Box key="pri-sol" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Typography variant="subtitle1">Price: ${price?.toFixed(2)}</Typography>
                                <Typography variant="subtitle1">Sold: {sold}</Typography>
                            </Box>
                        }
                    />
                    <ItemDisplayer lh={20} lw={300}
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
                    <ItemDisplayer lh={20} lw={170}
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
                    <ItemDisplayer lh={25} lw={250}
                        item={<Typography key="ser" variant="subtitle1">Series: {series}</Typography>}
                    />
                    <ItemDisplayer lh={100}
                        item={<Typography key="des" variant="body1">{description}</Typography>}
                    />
                    <ItemDisplayer lh={60}
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
                                    // onClick={}
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
