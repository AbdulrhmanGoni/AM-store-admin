import { Box, FilledInput, InputAdornment } from '@mui/material';
import { FormEvent, useState } from 'react';
import useProductsActions from '../../hooks/useProductsActions';
import { LoadingButton } from '@mui/lab';
import { Discount } from '@mui/icons-material';
import useNotifications from '../../hooks/useNotifications';

interface DiscountsApplyerProps {
    productsIds: (string | number)[],
    onDiscountApplyied?: () => void
}
export default function DiscountsApplyer({ productsIds, onDiscountApplyied }: DiscountsApplyerProps) {

    const { addDiscountToProducts } = useProductsActions();
    const { message } = useNotifications();
    const [discount, setDiscount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    function applyTheDiscount(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const discountValue = formData.get("discount-value");
        if (discountValue && +discountValue > 0) {
            setLoading(true)
            addDiscountToProducts(productsIds, +`0.${discountValue}`)
                .then(() => {
                    setDiscount(0);
                    onDiscountApplyied?.()
                    message("The Discount added successfully", "success")
                })
                .catch(() => { })
                .finally(() => setLoading(false))
        }
    }

    return (
        <Box
            component="form"
            className="flex-row-center"
            onSubmit={applyTheDiscount}
            sx={{ height: "fit-content" }}
        >
            <FilledInput
                name='discount-value'
                size='small'
                type='text'
                value={discount}
                onChange={(event) => {
                    const value = +event.target.value.slice(0, 2);
                    !isNaN(value) && setDiscount(value);
                }}
                sx={{ width: 100 }}
                inputProps={{ style: { paddingTop: "3px" } }}
                endAdornment={<InputAdornment position="end" sx={{ ml: 0 }}>%</InputAdornment>}
            />
            <LoadingButton
                aria-label="Apply the discount"
                size='small'
                type='submit'
                variant='contained'
                sx={{ ml: 1 }}
                loading={loading}
                loadingPosition='start'
                startIcon={<Discount />}
            >
                Apply discount
            </LoadingButton>
        </Box>
    )
}
