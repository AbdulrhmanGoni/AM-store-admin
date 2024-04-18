import { Add, LiveTv, Subtitles, AllInbox, AttachMoney, Class } from '@mui/icons-material'
import { Box, Grid, Paper, Container } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import ProductCustomTextField, { ErrorMessage } from '../components/products-pages/ProductCustomTextField';
import useAddProducts from '../hooks/useAddProducts';
import pageSpaces from '../CONSTANTS/pageSpaces';
import { P } from '@abdulrhmangoni/am-store-library';
import ProductsImagesInputs from '../components/products-pages/ProductsImagesInputs';
import ProductsFormLoadingOverlay from '../components/products-pages/ProductsFormLoadingOverlay';

export default function AddProductPage() {

    const {
        handleSubmit,
        titleState,
        priceState,
        seriesState,
        descriptionState,
        amountState,
        categoryState,
        imageState,
        isLoading,
        addingDone
    } = useAddProducts();

    return (
        <Container
            maxWidth="md"
            component="form"
            onSubmit={handleSubmit}
            id='addProductForm'
            sx={{
                display: "flex",
                justifyContent: "center",
                "& .css-1nylpq2": { alignItems: "center" },
                "& input": { pl: 1.5 }
            }}
        >
            <Paper sx={{ p: pageSpaces, position: "relative" }}>
                <ProductsFormLoadingOverlay isLoading={isLoading} />
                <P sx={{ p: "8px 4px", pb: pageSpaces }} variant='h5'>Add Product</P>
                <Grid container spacing={pageSpaces}>
                    <Grid item xs={12} md={6}>
                        <ProductCustomTextField name="title"
                            error={titleState}
                            errorMsg="The title should consists of 6 letters at least"
                            label="Product Title"
                            Icon={Subtitles}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}
                        sx={{
                            display: "flex",
                            gap: pageSpaces,
                            "&>*": { flexBasis: "50%" }
                        }}>
                        <Box>
                            <ProductCustomTextField name="price"
                                error={priceState}
                                errorMsg="The price should be positive number"
                                label="Price"
                                Icon={AttachMoney}
                            />
                        </Box>
                        <Box>
                            <ProductCustomTextField name="amount"
                                error={amountState}
                                errorMsg="amount of this product should be positive number"
                                label="Amount"
                                type="number"
                                Icon={AllInbox}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <ProductsImagesInputs error={!imageState} clearInputs={addingDone} />
                        <ErrorMessage error={!imageState && "You should add one image at least"} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ProductCustomTextField name="series"
                            error={seriesState}
                            errorMsg="Series name should consists of 2 letters at least"
                            label="Series"
                            Icon={LiveTv}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ProductCustomTextField name="category"
                            label="Category"
                            error={categoryState}
                            errorMsg='You have to select category of product'
                            isSelectBox
                            Icon={Class}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ProductCustomTextField name="description"
                            sx={{ alignItems: 'flex-start' }}
                            error={descriptionState}
                            errorMsg="You have to describe this product by 20 letters at least"
                            label="Description"
                            multiline
                            minRows={4}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                    <LoadingButton
                        loading={isLoading}
                        startIcon={<Add />}
                        loadingPosition='start'
                        size='small'
                        variant='contained'
                        type='submit'
                    >
                        Add Product
                    </LoadingButton>
                </Box>
            </Paper>
        </Container>
    )
}
