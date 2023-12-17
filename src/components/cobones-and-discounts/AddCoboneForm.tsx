import { Box, FilledInput, InputAdornment, Paper } from '@mui/material';
import { Discount, Redeem } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { P } from '@abdulrhmangoni/am-store-library';
import useAddingDiscountCobones from '../../hooks/useAddingDiscountCobones';

export default function AddCoboneForm() {

    const {
        DiscountInput,
        onSubmit,
        loading,
        error,
        coboneNameFieldRef
    } = useAddingDiscountCobones();

    return (
        <Paper
            component="form"
            className='flex-row-column gap1'
            onSubmit={onSubmit}
            sx={{ p: 1.5 }}
        >
            <Box className='flex-row gap1' sx={{ flexWrap: "wrap" }}>
                <FilledInput
                    inputRef={coboneNameFieldRef}
                    name='cobone-name'
                    size='small'
                    placeholder='Cobone Name'
                    inputProps={{ style: { paddingTop: "3px" } }}
                    error={!!error?.length}
                    disabled={loading}
                    sx={{
                        flexBasis: { xs: "100%", sm: "auto" },
                        flex: { sm: 2 }
                    }}
                    endAdornment={
                        <InputAdornment position="end" sx={{ ml: 0 }}>
                            <Redeem fontSize='small' />
                        </InputAdornment>
                    }
                />
                <DiscountInput
                    inputName='discount-value'
                    style={{ flex: 1 }}
                    disabled={loading}
                />
                <LoadingButton
                    aria-label="Add the discount"
                    size='small'
                    type='submit'
                    variant={'contained'}
                    loading={loading}
                    loadingPosition='start'
                    startIcon={<Discount />}
                    sx={{ flex: 1 }}
                >
                    Add discount
                </LoadingButton>
            </Box>
            {!!error?.length && <P mt={.5} color="error.main">{error}</P>}
        </Paper >
    )
}