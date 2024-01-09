import { useEffect, useState } from 'react'
import { MenuItem, SxProps, TextField } from '@mui/material'

type value = string | number

interface SelectBoxProps {
    values: value[],
    defaultValue?: value,
    size?: 'small' | 'medium',
    noneOption?: boolean,
    onSelect: (value: value, index: number) => void,
    sx?: SxProps
}

export default function SelectBox({ defaultValue, size, values, noneOption, onSelect, sx }: SelectBoxProps) {

    const [selected, setSelected] = useState<value>(noneOption ? "None" : values[0]);

    useEffect(() => { defaultValue && setSelected(defaultValue) }, [defaultValue]);

    return (
        <TextField
            select
            size={size}
            value={selected}
            onChange={(event) => {
                const value = event.target.value
                setSelected(value)
                onSelect(value, values.indexOf(value as never))
            }}
            sx={{
                minWidth: "87px",
                "& .MuiSelect-select": {
                    p: "4px 8px",
                    pr: "40px !important"
                },
                ...sx
            }}
        >
            {noneOption && <MenuItem key="None" value="None">None</MenuItem>}
            {values.map((value) => (<MenuItem key={value} value={value}>{value}</MenuItem>))}
        </TextField>
    )
}