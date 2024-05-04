import {
    Box, FormControl,
    IconButton, InputLabel,
    MenuItem, Select,
    SelectChangeEvent,
    Skeleton, Tooltip,
    useTheme
} from "@mui/material";
import useSettings from "../../hooks/useSettings";
import { useState } from "react";
import { FieldProps } from "./ProductCustomTextField";
import OverlayWindow from "../OverlayWindow";
import AddCategoryForm from "./AddCategoryForm";

export default function CategoriesSelectBox({ error, name, label, disabled, defaultValue }: FieldProps) {

    const { data, isLoading } = useSettings();
    const { palette: { mode } } = useTheme();
    const [selectCategory, setSelectedCategory] = useState<string>(defaultValue ?? "none");
    const handleSlectCategory = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value);
    }

    return (
        isLoading ? <Skeleton variant="rounded" width="100%" height="56px" /> :
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
                    <MenuItem value="none">None</MenuItem>
                    {data?.productsCategories?.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </Select>
                <Box sx={{
                    position: "absolute",
                    right: "4px",
                    top: "50%",
                    translate: "0% -50%",
                    zIndex: 1000
                }}>
                    <OverlayWindow
                        customBtn={
                            <IconButton>
                                <Tooltip title="Add Category" placement='top'>
                                    <img
                                        src={`/icons/add-category-icon-${mode === "dark" ? "light" : "dark"}.svg`}
                                        width={23}
                                        height={23}
                                    />
                                </Tooltip>
                            </IconButton>
                        }
                    >
                        <AddCategoryForm open />
                    </OverlayWindow>
                </Box>
            </FormControl>
    )
}