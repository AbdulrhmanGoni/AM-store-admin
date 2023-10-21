import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
    Box, TextField, Typography,
    FormControl, Select, InputLabel,
    MenuItem, SelectChangeEvent,
    SvgIconTypeMap, alpha, useTheme, SxProps
} from "@mui/material";
import CATEGORIES from "../../CONSTANTS/CATEGORIES";
import { PromiseState } from "../../types/interfaces";
import { AddPhotoAlternateOutlined, ChangeCircleOutlined, HideImageOutlined } from "@mui/icons-material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { CSSProperties } from "@mui/material/styles/createMixins";
import { ElementWithLoadingState } from '@abdulrhmangoni/am-store-library';
import pageSpaces from "../../CONSTANTS/pageSpaces";

type FieldProps = {
    label?: string,
    name: string,
    type?: string,
    error?: boolean,
    defaultValue?: string,
    disabled?: boolean
}

type TextFieldProps = {
    Icon?: OverridableComponent<SvgIconTypeMap<{ sx: SxProps }, "svg">> & { muiName: string },
    multiline?: boolean,
    errorMsg?: string,
    sx?: CSSProperties,
    TextFieldSx?: CSSProperties,
    placeholder?: string,
    minRows?: number,
    isSelectBox?: boolean
}


export function ErrorMessage({ error }: { error?: false | string }) {
    return <Typography sx={{ fontSize: "12px", mt: "4px", color: "red" }}>{error}</Typography>
}

export function CustomTextField(props: TextFieldProps & FieldProps) {
    const {
        label, name, type, Icon,
        error, errorMsg, placeholder,
        sx, TextFieldSx, multiline,
        minRows, isSelectBox, disabled,
        defaultValue
    } = props;
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ...sx }}>
                {
                    isSelectBox ?
                        <SelectBox
                            name={name}
                            label={label}
                            error={error}
                            defaultValue={defaultValue}
                            type={type}
                        />
                        :
                        <TextField sx={TextFieldSx}
                            fullWidth
                            defaultValue={defaultValue}
                            multiline={multiline}
                            error={!error}
                            minRows={minRows}
                            type={type}
                            name={name}
                            disabled={disabled}
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

function SelectBox({ error, name, label, disabled, defaultValue }: FieldProps) {

    const [selectCategory, setSelectedCategory] = useState<string>(defaultValue ?? "none");
    const handleSlectCategory = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value);
    }

    return (
        <FormControl
            variant="outlined"
            fullWidth
            disabled={disabled}
            error={!error}
        >
            <InputLabel>Category</InputLabel>
            <Select
                name={name}
                value={selectCategory}
                onChange={handleSlectCategory}
                label={label}
                disabled={disabled}
            >
                <MenuItem value={"none"}>None</MenuItem>
                {CATEGORIES.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

interface ImagesInputsProps extends PromiseState {
    error: boolean,
    clearInputs?: boolean,
    defaultValue?: string[]
}
export function ImagesInputs({ error, clearInputs, defaultValue, isLoading }: ImagesInputsProps) {

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
                    element={<ImageInput defaultValue={defaultValue?.[0]} clear={clearInputs} name='image1' error={error} />}
                />
                <ElementWithLoadingState
                    height={120}
                    isLoading={isLoading}
                    element={<ImageInput defaultValue={defaultValue?.[1]} clear={clearInputs} name='image2' error={error} />}
                />
            </Box>
            <Box>
                <ElementWithLoadingState
                    height={120}
                    isLoading={isLoading}
                    element={<ImageInput defaultValue={defaultValue?.[2]} clear={clearInputs} name='image3' error={error} />}
                />
                <ElementWithLoadingState
                    height={120}
                    isLoading={isLoading}
                    element={<ImageInput defaultValue={defaultValue?.[3]} clear={clearInputs} name='image4' error={error} />}
                />
            </Box>
        </Box>
    )
}

function ImageInput(props: FieldProps & { clear?: boolean }) {

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
        center: CSSProperties = {
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%", height: "100%",
            zIndex: 1
        },
        AddIconStyle = { width: "35px", height: "35px" },
        fieldContainerStyle: CSSProperties = {
            position: "relative",
            height: "120px!important",
            width: "100%",
            ...border
        },
        labelStyle: CSSProperties = {
            cursor: disabled ? "not-allowed" : "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1, ...center,
            borderRadius: "4px"
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
                <Typography>Add an image</Typography>
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