import { useEffect, useState } from "react"
import { Card, Typography, Box, IconButton, Rating, Button, Avatar } from "@mui/material"
import { host_admin } from "@/CONSTANT/API_hostName"
import useApiRequest from "@/hooks/useApiRequest"
import { productData } from "@/types/dataTypes"
import { Close, Delete } from "@mui/icons-material"
import LoadingGrayBar, { widthAndHeightType as wh } from "./LoadinGrayBar"


export default function ProductsDisplayer({ id, close, palette: { background, text, primary } }) {

    const { api } = useApiRequest();
    const [product, setProduct] = useState<productData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [cardsOpacity, setCardsOpacity] = useState<number>(0);

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
        return (<>
            {
                isLoading ? <LoadingGrayBar w={lw ?? "100%"} h={lh} type="rou" sx={{ bgcolor: "rgb(0 0 0 / 20%)" }} />
                    : isError ? null
                        : [item]
            }
        </>)
    }

    function ImagesDisplayer({ images }) {

        const [current, setCurrent] = useState<string>(images?.[0]);

        return (
            <Box sx={{ display: "flex", flexBasis: "50%", flexDirection: "column", gap: 1 }}>
                <ItemDisplayer lh={350}
                    item={
                        <Avatar
                            key="img" alt="product's image" src={current ?? ""}
                            sx={{ width: "100%", height: "350px", borderRadius: 0, "& > img": { objectFit: "fill" } }}
                        />
                    }
                />
                <ItemDisplayer lh={45}
                    item={
                        <Box key="bar" sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                            {
                                images?.map((url: string, i: number) =>
                                    <Avatar
                                        key={"img-" + i} src={url ?? ""}
                                        sx={{
                                            borderRadius: 1,
                                            border: "solid 2px", objectFit: "fill",
                                            borderColor: url === current ? primary.main : text.primary
                                        }}
                                        onClick={() => { setCurrent(url) }}>
                                        A
                                    </Avatar>
                                )
                            }
                        </Box>
                    }
                />
            </Box>
        )
    }

    const { title, price, description, series, images, sold, earnings } = product ?? {}

    return (
        <Box sx={containerStyle}>
            <Card sx={{ ...cardStyle, bgcolor: background.paper, color: text.primary, opacity: cardsOpacity }}>
                <ImagesDisplayer images={images} />
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
                                The products achieves ${earnings?.toFixed(2)} of earnings
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
                        item={
                            <Typography key="ser" variant="subtitle1">Series: {series}</Typography>
                        }
                    />
                    <ItemDisplayer lh={100}
                        item={
                            <Typography key="des" variant="body1">{description}</Typography>
                        }
                    />
                    <ItemDisplayer lh={60}
                        item={
                            <Box key="act" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                <Button color="error" variant="contained" size="small" startIcon={<Delete />} >Delete</Button>
                            </Box>
                        }
                    />
                </Box>
                <IconButton
                    onClick={() => {
                        setCardsOpacity(0);
                        close();
                    }}
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
    top: 5, right: 5
}
const infoSectionStyle = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    flexBasis: "50%",
    p: "12px", gap: 1,
}
