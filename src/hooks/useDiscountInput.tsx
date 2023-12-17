import { FilledInput, InputAdornment, SxProps } from '@mui/material';
import { useState } from 'react';

interface DiscountInputProps {
    inputName: string,
    style?: SxProps,
    error?: boolean,
    disabled?: boolean
}

export default function useDiscountInput() {

    const [discount, setDiscount] = useState<string>("");
    const [focusInput, setFocusInput] = useState<boolean>(false);

    function isValidDiscount(value: number): boolean {
        return !isNaN(value) && value > 0
    }

    function DiscountInput({ inputName, style, error, disabled }: DiscountInputProps) {
        return (
            <FilledInput
                name={inputName}
                size='small'
                type='text'
                title='Discount value'
                placeholder='Discount'
                value={discount}
                error={error}
                disabled={disabled}
                onChange={(event) => {
                    const value = +event.target.value.slice(0, 2);
                    if (event.target.value === "") {
                        setDiscount('');
                    } else {
                        isValidDiscount(value) && setDiscount(`${value}`);
                        !focusInput && setFocusInput(true)
                    }
                }}
                autoFocus={focusInput}
                sx={{ width: 110, ...style }}
                inputProps={{ style: { paddingTop: "3px" } }}
                endAdornment={<InputAdornment position="end" sx={{ ml: 0 }}>%</InputAdornment>}
            />
        )
    }

    return {
        discount,
        DiscountInput,
        isValidDiscount,
        clearInput() { setDiscount("") }
    }
}
