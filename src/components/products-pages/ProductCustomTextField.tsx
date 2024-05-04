import { Box, TextField, SvgIconTypeMap, SxProps } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { P } from '@abdulrhmangoni/am-store-library';
import CategoriesSelectBox from "./CategoriesSelectBox";

export type FieldProps = {
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
    sx?: SxProps,
    TextFieldSx?: SxProps,
    placeholder?: string,
    minRows?: number,
    isSelectBox?: boolean
}

export function ErrorMessage({ error }: { error?: false | string }) {
    return <P sx={{ fontSize: "12px", mt: "4px", color: "red" }}>{error}</P>
}

export default function ProductCustomTextField(props: TextFieldProps & FieldProps) {
    const {
        label, name, type, Icon,
        error, errorMsg, placeholder,
        sx, TextFieldSx, multiline,
        minRows, isSelectBox, disabled,
        defaultValue
    } = props;

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ...sx, position: "relative" }}>
                {
                    isSelectBox ?
                        <CategoriesSelectBox
                            name={name}
                            label={label}
                            error={error}
                            defaultValue={defaultValue}
                            type={type}
                        />
                        :
                        <TextField
                            sx={TextFieldSx}
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
