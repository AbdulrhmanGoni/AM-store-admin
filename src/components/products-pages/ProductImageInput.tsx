import { FieldProps } from "./ProductCustomTextField";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, SxProps, TextField, alpha, useTheme } from "@mui/material";
import { P } from "@abdulrhmangoni/am-store-library";
import { AddPhotoAlternateOutlined, ChangeCircleOutlined, HideImageOutlined } from "@mui/icons-material";


export default function ProductImageInput(props: FieldProps & { clear?: boolean }) {

    const { name, error, label, clear, disabled, defaultValue } = props;
    const { palette: { text } } = useTheme();

    const [readyUrl, setReadyUrl] = useState<string | undefined>(defaultValue);
    const [imageSrc, setImageSrc] = useState<string>();
    const inputRef = useRef<HTMLInputElement>();

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files![0])
            reader.onload = () => { setImageSrc(String(reader.result)) }
        } catch (error) { /* nothing yet */ }
    }
    function openInput() {
        readyUrl && setReadyUrl(undefined)
        setTimeout(() => { !disabled && inputRef.current?.click() }, 1)
    }

    function clearInput() {
        if (inputRef.current) { inputRef.current.value = "" }
        setImageSrc(undefined);
        readyUrl && setReadyUrl(undefined);
    }

    useEffect(() => { clear && clearInput() }, [clear])
    useEffect(() => { defaultValue && setReadyUrl(defaultValue) }, [defaultValue])

    const
        border = {
            border: "solid 1px",
            borderColor: error ? "error.main" : alpha(text.primary, .23),
            "&:hover": { borderColor: text.primary }
        },
        center: SxProps = {
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%", height: "100%",
            zIndex: 1
        },
        AddIconStyle = { width: "35px", height: "35px" },
        fieldContainerStyle: SxProps = {
            position: "relative",
            height: "120px!important",
            width: "100%",
            ...border
        },
        labelStyle: SxProps = {
            cursor: disabled ? "not-allowed" : "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1, ...center,
            borderRadius: "4px"
        },
        floatingIconStyle: SxProps = {
            position: "absolute",
            bottom: "2px",
            right: "2px",
            zIndex: 3,
            bgcolor: "primary.main",
            borderRadius: "4px"
        }

    return (
        <Box sx={fieldContainerStyle}>
            <TextField
                type={readyUrl ? "text" : "file"}
                name={name}
                inputRef={inputRef}
                defaultValue={defaultValue}
                sx={{ display: "none" }}
                id={name}
                label={label}
                onChange={handleFileChange}
            />
            <Box
                onClick={openInput}
                sx={labelStyle}
            >
                <P>Add an image</P>
                <AddPhotoAlternateOutlined sx={AddIconStyle} />
            </Box>
            {
                (imageSrc || readyUrl) &&
                <Box sx={{ ...center, zIndex: 2, bgcolor: "background.paper" }}>
                    <Box
                        component="img"
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain"
                        }}
                        src={readyUrl ?? imageSrc}
                        alt={name}
                    />
                    <ChangeCircleOutlined
                        onClick={openInput}
                        sx={floatingIconStyle}
                    />
                    <HideImageOutlined
                        sx={{ ...floatingIconStyle, right: "35px", bgcolor: "error.main" }}
                        onClick={clearInput}
                    />
                </Box>
            }
        </Box>
    )
}