import { Typography, Paper, TextField, InputAdornment, Box, Button, LinearProgress } from "@mui/material";
import pageSpaces from "../../CONSTANTS/pageSpaces";
import { ReactNode, useState } from "react";

interface SettingBoxProps<ValueType> {
    title: string,
    initialValue?: ValueType,
    description: string,
    inputStartIcon?: ReactNode
    onSaveChanges: (newValue: ValueType) => Promise<void>
}

export default function SettingBox<ValueType>({ title, description, initialValue, inputStartIcon, onSaveChanges }: SettingBoxProps<ValueType>) {

    const [newValue, setNewValue] = useState<ValueType>();
    const [updateLoading, setUpdateLoading] = useState<boolean>()

    const currentValue = newValue || initialValue;

    function saveChanges() {
        if (newValue) {
            setUpdateLoading(true)
            onSaveChanges(newValue)
                .finally(() => setUpdateLoading(false))
        }
    }

    function cancelChanges() {
        setNewValue(undefined)
    }

    return (
        <Paper sx={{ p: pageSpaces, height: "100%", position: "relative" }}>
            <Typography variant="subtitle1" fontWeight="bold">
                {title}
            </Typography>
            <TextField
                size="small"
                sx={{ width: "100%", my: 1 }}
                type="number"
                value={currentValue}
                onChange={({ target: { value } }) => {
                    setNewValue(value as ValueType)
                }}
                disabled={!initialValue}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {inputStartIcon}
                        </InputAdornment>
                    )
                }}
            />
            <Typography variant="body2" mb={1}>
                {description}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                {
                    newValue && newValue !== initialValue &&
                    <>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={cancelChanges}
                            color="error"
                            disabled={updateLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={updateLoading}
                            variant="contained"
                            size="small"
                            onClick={saveChanges}
                        >
                            Save
                        </Button>
                        {updateLoading && <LinearProgress sx={{ position: "absolute", bottom: 0, left: 0, width: "100%" }} />}
                    </>
                }
            </Box>
        </Paper>
    )
}
