import CATEGORIES from "@/CONSTANT/CATEGORIES";
import { pageSpaces } from "@/app/page";
import { AddPhotoAlternateOutlined, ChangeCircleOutlined, HideImageOutlined } from "@mui/icons-material";
import {
    Box, TextField, Typography,
    FormControl, Select, InputLabel,
    MenuItem, SelectChangeEvent,
    SvgIconTypeMap, alpha, useTheme
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { CSSProperties } from "@mui/material/styles/createMixins";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";


type FieldProps = {
    label?: string,
    name: string,
    type?: string,
    error?: boolean,
}

type TextFieldProps = {
    Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string },
    multiline?: boolean,
    errorMsg?: string,
    sx?: CSSProperties,
    TextFieldSx?: CSSProperties,
    placeholder?: string,
    minRows?: number,
    selectBox?: boolean
}


export function ErrorMessage({ error }: { error?: false | string }) {
    return <Typography sx={{ fontSize: "12px", mt: "4px", color: "red" }}>{error}</Typography>
}

export function CustomTextField(props: TextFieldProps & FieldProps) {
    let {
        label, name, type, Icon,
        error, errorMsg, placeholder,
        sx, TextFieldSx, multiline,
        minRows, selectBox
    } = props;
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ...sx }}>
                {
                    selectBox ?
                        <SelectBox
                            name={name}
                            label={label}
                            error={error}
                            type={type}
                        />
                        :
                        <TextField sx={TextFieldSx}
                            fullWidth
                            multiline={multiline}
                            error={!error}
                            minRows={minRows}
                            type={type}
                            name={name}
                            label={label}
                            placeholder={placeholder}
                            variant="outlined"
                            InputProps={{
                                startAdornment: Icon ? <Icon sx={{ m: "4px 8px 4px 0px" }} /> : undefined,
                            }}
                        />
                }
            </Box>
            <ErrorMessage error={!error && errorMsg} />
        </>
    )
}

function SelectBox({ error, name, label }: FieldProps) {

    const [selectCategory, setSelectedCategory] = useState<string>("none");
    const handleSlectCategory = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value);
    }

    return (
        <FormControl
            variant="outlined"
            fullWidth
            error={!error}
        >
            <InputLabel>Category</InputLabel>
            <Select
                name={name}
                value={selectCategory}
                onChange={handleSlectCategory}
                label={label}
            >
                <MenuItem value={"none"}>None</MenuItem>
                {CATEGORIES.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

type ImageInputProps = { readyImage?: string }

export function ImagesInputs({ error, clearInputs }: { error: boolean, clearInputs?: boolean }) {

    return (
        <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: pageSpaces,
            alignItems: "center",
            "& > *": { width: "100%", flexBasis: "50%", display: "flex", gap: pageSpaces }
        }}>
            <Box>
                <AddImageInput clear={clearInputs} name='image1' error={error} />
                <AddImageInput clear={clearInputs} name='image2' error={error} />
            </Box>
            <Box>
                <AddImageInput clear={clearInputs} name='image3' error={error} />
                <AddImageInput clear={clearInputs} name='image4' error={error} />
            </Box>
        </Box>
    )
}
export function AddImageInput(props: FieldProps & ImageInputProps & { clear?: boolean }) {

    let { name, error, readyImage, label, clear } = props

    const [imageSrc, setImageSrc] = useState<string | null>(readyImage ?? null);
    const { palette: { text } } = useTheme();
    const inputRef = useRef<HTMLInputElement>();

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files![0])
            reader.onload = () => { setImageSrc(String(reader.result)) }
        } catch (error) {
            setImageSrc(null)
        }
    }

    function clearInput() {
        if (inputRef.current) { inputRef.current.value = "" }
        setImageSrc(null);
    }

    useEffect(() => { 
        clear && clearInput() 
        console.log(clear)
    }, [clear])

    const
        border = {
            border: "solid 1px",
            borderColor: error ? "error.main" : alpha(text.primary, .23),
            "&:hover": { borderColor: text.primary }
        },
        center: CSSProperties = {
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%", height: "100%",
            zIndex: 1
        },
        AddIconStyle = { width: "35px", height: "35px" },
        imageStyle: CSSProperties = { ...center, zIndex: 2 },
        imageContainerStyle: CSSProperties = {
            position: "relative",
            height: "120px!important",
            width: "100%"
        },
        labelStyle: CSSProperties = {
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1, ...center,
            borderRadius: "4px",
            ...border
        },
        floatingIconStyle: CSSProperties = {
            position: "absolute",
            bottom: "2px",
            right: "2px",
            zIndex: 3,
            backgroundColor: "primary.main",
            borderRadius: "4px"
        }

    return (
        <Box sx={imageContainerStyle}>
            <TextField
                type="file"
                name={name}
                inputRef={inputRef}
                sx={{ display: "none" }}
                id={name}
                label={label}
                onChange={handleFileChange}
            />
            <Box
                onClick={() => { inputRef.current?.click() }}
                sx={labelStyle}
            >
                <Typography>Add an image</Typography>
                <AddPhotoAlternateOutlined sx={AddIconStyle} />
            </Box>
            {
                imageSrc &&
                <>
                    <Image
                        style={imageStyle}
                        src={imageSrc ?? "/"}
                        width={0}
                        height={0}
                        alt={name ?? "product image"}
                    />
                    <ChangeCircleOutlined
                        onClick={() => { inputRef.current?.click() }}
                        sx={floatingIconStyle}
                    />
                    <HideImageOutlined
                        sx={{ ...floatingIconStyle, right: "35px", bgcolor: "error.main" }}
                        onClick={clearInput}
                    />
                </>
            }
        </Box>
    )
}

