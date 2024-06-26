import { useRef } from 'react';
import { LiveTv, Subtitles, AllInbox, AttachMoney, Class, Save, Close } from '@mui/icons-material'
import { Box, Button, Grid, Paper } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import ProductCustomTextField, { ErrorMessage } from './ProductCustomTextField';
import useUpdateProduct from '../../hooks/useUpdateProduct';
import { ActionAlert, ElementWithLoadingState, IllustrationCard, P } from '@abdulrhmangoni/am-store-library';
import pageSpaces from '../../CONSTANTS/pageSpaces';
import ProductsImagesInputs from './ProductsImagesInputs';
import ProductsFormLoadingOverlay from './ProductsFormLoadingOverlay';

export default function EditProductForm({ productId, close }: { productId: string, close: () => void }) {

    const formRef = useRef<HTMLFormElement | null>(null);

    const {
        theProduct,
        handleSubmit,
        isLoading,
        anError,
        titleState,
        priceState,
        seriesState,
        descriptionState,
        amountState,
        categoryState,
        imageState,
        updatingLoading,
    } = useUpdateProduct({ productId });

    function submit() { formRef.current && handleSubmit(formRef.current) }

    return anError == "notFound" ? <NotFound productId={productId} />
        : anError == "unexpected" ? <Unexpected />
            : <Paper
                component="form"
                ref={formRef}
                id='addProductForm'
                sx={{
                    p: pageSpaces,
                    maxWidth: 1000,
                    m: "0px auto",
                    "& .css-1nylpq2": { alignItems: "center" },
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    position: "relative"
                }}
            >
                <ProductsFormLoadingOverlay isLoading={updatingLoading} />
                <ElementWithLoadingState height={24} width={280} isLoading={isLoading}
                    element={
                        <P sx={{ pb: pageSpaces }} variant='subtitle1'>
                            Editing "{productId}"
                        </P>
                    }
                />
                <Grid container spacing={pageSpaces}>
                    <Grid item xs={12} md={6}>
                        <ElementWithLoadingState
                            height={55} isLoading={isLoading}
                            element={
                                <ProductCustomTextField name="title"
                                    defaultValue={theProduct?.title}
                                    error={titleState}
                                    errorMsg="The title should consists of 6 letters at least"
                                    label="Product Title"
                                    Icon={Subtitles}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={6}
                        sx={{
                            display: "flex",
                            gap: pageSpaces,
                            "& > *": { flexBasis: "50%" }
                        }}>
                        <Box>
                            <ElementWithLoadingState
                                height={55} isLoading={isLoading}
                                element={
                                    <ProductCustomTextField name="price"
                                        label="Price"
                                        error={priceState}
                                        defaultValue={String(theProduct?.price)}
                                        errorMsg="The price should be positive number"
                                        Icon={AttachMoney}
                                    />
                                }
                            />
                        </Box>
                        <Box>
                            <ElementWithLoadingState
                                height={55} isLoading={isLoading}
                                element={
                                    <ProductCustomTextField name="amount"
                                        error={amountState}
                                        errorMsg="amount of this product should be positive number"
                                        defaultValue={String(theProduct?.amount)}
                                        label="Amount"
                                        type="number"
                                        Icon={AllInbox}
                                    />
                                }
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <ProductsImagesInputs
                            error={!imageState}
                            isLoading={isLoading}
                            defaultValue={theProduct?.images}
                        />
                        <ErrorMessage error={!imageState && "You should add one image at least"} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ElementWithLoadingState
                            height={55} isLoading={isLoading}
                            element={
                                <ProductCustomTextField name="series"
                                    error={seriesState}
                                    defaultValue={theProduct?.series}
                                    errorMsg="Series name should consists of 2 letters at least"
                                    label="Series"
                                    Icon={LiveTv}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ElementWithLoadingState
                            height={55} isLoading={isLoading}
                            element={
                                <ProductCustomTextField name="category"
                                    label="Category"
                                    defaultValue={theProduct?.category}
                                    error={categoryState}
                                    errorMsg='You have to select category of product'
                                    isSelectBox
                                    Icon={Class}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ElementWithLoadingState
                            height={125} isLoading={isLoading}
                            element={
                                <ProductCustomTextField name="description"
                                    sx={{ alignItems: 'flex-start' }}
                                    error={descriptionState}
                                    defaultValue={theProduct?.description}
                                    errorMsg="You have to describe this product by 20 letters at least"
                                    label="Description"
                                    multiline
                                    minRows={4}
                                />
                            }
                        />
                    </Grid>
                </Grid>
                <Box className="flex-row-center-between">
                    <ElementWithLoadingState
                        height={30}
                        width={150}
                        isLoading={isLoading}
                        element={
                            <Button
                                endIcon={<Close />}
                                size='small'
                                variant='contained'
                                color="error"
                                onClick={close}
                            >
                                Cancel
                            </Button>
                        }
                    />
                    <ElementWithLoadingState
                        height={30}
                        width={150}
                        isLoading={isLoading}
                        element={
                            <ActionAlert
                                action={submit}
                                title='Changes on the product'
                                message="Are you sure you want to apply the changes on this product? know if you continue you can't undo the changes"
                            >
                                <LoadingButton
                                    loading={updatingLoading}
                                    startIcon={<Save />}
                                    loadingPosition='start'
                                    size='small'
                                    variant='contained'
                                >
                                    Save Changes
                                </LoadingButton>
                            </ActionAlert>
                        }
                    />
                </Box>
            </Paper>
}

function NotFound({ productId }: { productId: string }) {
    return (
        <IllustrationCard
            title='The Product Not Found'
            illustratorType="notFound"
            message={`There is no product with '${productId}' id`}
            alertType="warning"
            disableHeight
        />
    )
}

function Unexpected() {
    return (
        <IllustrationCard
            title='There is error happends'
            illustratorType="unexpected"
            hideAlertMsg
            disableHeight
        />
    )
}
