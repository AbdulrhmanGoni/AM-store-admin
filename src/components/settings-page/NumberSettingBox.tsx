import { TextField, InputAdornment } from "@mui/material";
import { ReactNode, useState } from "react";
import SettingBox from "./SettingBox";
import SettingActionsButtons from "./SettingActionsButtons";

interface SettingBoxProps<ValueType> {
    title: string,
    initialValue?: ValueType,
    description: string,
    inputStartIcon?: ReactNode
    onSaveChanges: (newValue: ValueType) => Promise<void>
}

export default function NumberSettingBox<ValueType>({ title, description, initialValue, inputStartIcon, onSaveChanges }: SettingBoxProps<ValueType>) {

    const [newValue, setNewValue] = useState<ValueType>();
    const [updateLoading, setUpdateLoading] = useState<boolean>()

    const currentValue = newValue || initialValue;

    function saveChanges() {
        if (newValue) {
            setUpdateLoading(true)
            onSaveChanges(newValue)
                .then((res) => {
                    console.log(res)
                    setNewValue(undefined)
                })
                .finally(() => setUpdateLoading(false))
        }
    }

    function cancelChanges() {
        setNewValue(undefined)
    }

    return (
        <SettingBox
            title={title}
            description={description}
            actionsSection={
                <SettingActionsButtons
                    open={newValue && newValue !== initialValue}
                    cancelAction={cancelChanges}
                    saveAction={saveChanges}
                    isLoading={updateLoading}
                />
            }
        >
            <TextField
                size="small"
                sx={{ width: "100%" }}
                type="number"
                value={currentValue}
                onChange={({ target: { value } }) => {
                    setNewValue(value as ValueType)
                }}
                // disabled={!editMode}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {inputStartIcon}
                        </InputAdornment>
                    )
                }}
            />
        </SettingBox>
    )
}
