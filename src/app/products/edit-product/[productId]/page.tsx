"use client"
import {
    LiveTv, Subtitles,
    AllInbox, AttachMoney, Class, Save,
} from '@mui/icons-material'
import { Box, Typography, Grid, Paper } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { CustomTextField, ErrorMessage, ImagesInputs } from '../../components/ProductsFormComponents';
import useUpdateProduct from '../../hooks/useUpdateProduct';
import { pageSpaces } from '@/app/page';
import DisplayerItemWithLoadingState from '@/components/DisplayerItemWithLoadingState';
import { useParams } from 'next/navigation'
import { ActionAlert, ErrorThrower } from '@abdulrhmangoni/am-store-library';
import { useRef } from 'react';

export default function EditProductForm() {

    const { productId } = useParams();
    const formRef = useRef<HTMLFormElement | null>(null)

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
                    "& input": { pl: 1.5 },
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}
            >
                <DisplayerItemWithLoadingState height={30} width={150} isLoading={isLoading}
                    item={<Typography sx={{ p: "0px 4px", pb: pageSpaces }} variant='h5'>Edit Product</Typography>}
                />
                <Grid container spacing={pageSpaces}>
                    <Grid item xs={12} md={6}>
                        <DisplayerItemWithLoadingState
                            height={55} isLoading={isLoading}
                            item={
                                <CustomTextField name="title"
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
                            "&>*": { flexBasis: "50%" }
                        }}>
                        <Box>
                            <DisplayerItemWithLoadingState
                                height={55} isLoading={isLoading}
                                item={
                                    <CustomTextField name="price"
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
                            <DisplayerItemWithLoadingState
                                height={55} isLoading={isLoading}
                                item={
                                    <CustomTextField name="amount"
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
                        <ImagesInputs
                            error={!imageState}
                            isLoading={isLoading}
                            defaultValue={theProduct?.images}
                        />
                        <ErrorMessage error={!imageState && "You should add one image at least"} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DisplayerItemWithLoadingState
                            height={55} isLoading={isLoading}
                            item={
                                <CustomTextField name="series"
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
                        <DisplayerItemWithLoadingState
                            height={55} isLoading={isLoading}
                            item={
                                <CustomTextField name="category"
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
                        <DisplayerItemWithLoadingState
                            height={125} isLoading={isLoading}
                            item={
                                <CustomTextField name="description"
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
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <DisplayerItemWithLoadingState
                        height={30}
                        width={150}
                        isLoading={isLoading}
                        item={
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
                                    aria-label='Submit Changes'
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
        <ErrorThrower
            title='The Product Not Found'
            illustratorType="notFound"
            message={`There is no product with '${productId}' id`}
            alertType="warning"
        />
    )
}

function Unexpected() {
    return (
        <ErrorThrower
            title='There is error happends'
            illustratorType="unexpected"
            hideAlertMsg
        />
    )
}
