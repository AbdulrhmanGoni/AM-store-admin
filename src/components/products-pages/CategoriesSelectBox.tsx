import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Skeleton } from "@mui/material";
import useSettings from "../../hooks/useSettings";
import { useState } from "react";
import { FieldProps } from "./ProductCustomTextField";

export default function CategoriesSelectBox({ error, name, label, disabled, defaultValue }: FieldProps) {

    const { data, isLoading } = useSettings();
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
            </FormControl>
    )
}