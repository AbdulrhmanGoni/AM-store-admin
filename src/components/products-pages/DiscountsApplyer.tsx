import { Box } from '@mui/material';
import { FormEvent, useState } from 'react';
import useProductsActions from '../../hooks/useProductsActions';
import { LoadingButton } from '@mui/lab';
import { Discount } from '@mui/icons-material';
import useNotifications from '../../hooks/useNotifications';
import useDiscountInput from '../../hooks/useDiscountInput';

interface DiscountsApplyerProps {
    productsIds: (string | number)[],
    onDiscountApplyied?: (discount: number) => void
}
export default function DiscountsApplyer({ productsIds, onDiscountApplyied }: DiscountsApplyerProps) {

    const { addDiscountToProducts } = useProductsActions();
    const { message } = useNotifications();
    const {
        discount,
        DiscountInput,
        isValidDiscount,
        clearInput
    } = useDiscountInput();
    const [loading, setLoading] = useState<boolean>(false);

    function applyTheDiscount(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const discountValue = formData.get("discount-value");
        if (discountValue && isValidDiscount(+discountValue)) {
            setLoading(true)

            addDiscountToProducts(productsIds, (+discountValue / 100))
                .then(() => {
                    onDiscountApplyied?.((+discountValue / 100))
                    clearInput();
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
            <DiscountInput inputName='discount-value' />
            <LoadingButton
                aria-label="Apply the discount"
                size='small'
                type='submit'
                variant={discount ? 'contained' : 'outlined'}
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
