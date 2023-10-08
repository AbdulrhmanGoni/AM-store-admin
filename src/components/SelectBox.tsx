import React, { useEffect, useState } from 'react'
import { MenuItem, TextField } from '@mui/material'

interface SelectBoxProps {
    values: string[],
    defaultValue?: string,
    size?: 'small' | 'medium'
}

export default function SelectBox({ defaultValue, size, values }: SelectBoxProps) {

    const [selected, setSelected] = useState<string>("None");

    useEffect(() => { defaultValue && setSelected(defaultValue) }, [defaultValue])

    return (
        <TextField
            select
            size={size}
            value={selected}
            onChange={(event) => { setSelected(event.target.value) }}
            sx={{ "& .MuiSelect-select": { p: "4px 8px" } }}
        >
            <MenuItem key="None" value="None">None</MenuItem>
            {values.map((value) => (<MenuItem key={value} value={value}>{value}</MenuItem>))}
        </TextField>
    )
}
