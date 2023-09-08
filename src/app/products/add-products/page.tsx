"use client"
import {
    Add, AddPhotoAlternate,
    AllInbox, AttachMoney, Class,
    Description, LiveTv, Subtitles
} from '@mui/icons-material'
import {
    Box, FormControl, TextField,
    Grid, InputLabel, MenuItem, Select,
    Typography
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import getImageFile from '../functions/getImageFile';
import { submetEvent } from '@/types/dataTypes';
import useAsyncActions from '../hooks/useAsyncActions';
import useFormValidationState from '../hooks/useFormValidationState';
import UPLOAD_IMAGE_API from '../CONSTANTS/UPLOAD_IMAGE_API';
import useNotifications from '@/hooks/useNotifications';
import axios from 'axios';


export const catagoriesInfo = [
    { index: 1, name: "figures" },
    { index: 2, name: "clothes" },
    { index: 3, name: "panels" },
];

function clearForm(formId: string) {
    const form: any = document.getElementById(formId);
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].type !== "submit") {
            form.elements[i].value = null;
        }
    }
}

const errorMsgStyle = { fontSize: "12px", ml: 4, mt: "4px", color: "red" };

type TextFieldAtt = {
    children: React.ReactNode,
    label?: string,
    name?: string,
    type?: string,
    error?: boolean,
    errorMsg?: string,
    sx?: object,
    placeholder?: string
}
const CustoTextField = ({ label, children, name, type, error, errorMsg, placeholder, sx }: TextFieldAtt) => {

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ...sx }}>
                {children}
                <TextField fullWidth
                    error={!error}
                    type={type}
                    name={name}
                    label={label}
                    placeholder={placeholder}
                    variant="outlined" />
            </Box>
            <Typography sx={errorMsgStyle}>{!error && errorMsg}</Typography>
        </>
    );
}

export default function AddProductForm() {

    const iconsStyle = { color: 'primary.main', mr: 1, my: 0.5 };

    const {
        titleState, priceState, seriesState, descriptionState,
        amountState, categoryState, imageState, formValidation
    } = useFormValidationState();
    const [isLoading, setIsLoading] = useState(false);
    const [selectCategory, setSelectedCategory] = useState("none");
    const { bySteps } = useNotifications();
    const { addNewProducts } = useAsyncActions()

    const handleSlectCategory = (_, current) => setSelectedCategory(current.props.value)

    function handleSubmit(event: submetEvent): void {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (formValidation(event)) {
            setIsLoading(true)
            const { update } = bySteps("Uploading product's image...");
            axios.post(UPLOAD_IMAGE_API, getImageFile(event)).then((data) => data)
                .then(({ data: { data }, status }) => {
                    const imageUrl = data.url ?? data.display_url;
                    formData.delete("image"); formData.append("ImageUrl", imageUrl);
                    status && addNewProducts(formData)
                        .then(res => {
                            if (res) {
                                update("success", "The product added successfully");
                                clearForm("addProductForm");
                            }
                        })
                        .catch(res => { res && update("error", "Addeding product failed! try again") })
                })
                .catch((err) => { update("error", "Uploading product image failed!, try again") })
                .finally(() => { setIsLoading(false) })
        }
    }

    return (
        <Box
            component="form" onSubmit={handleSubmit} id='addProductForm'
            sx={{ display: "flex", justifyContent: "center", "& .css-1nylpq2": { alignItems: "center" } }}
        >
            <Box sx={{ p: 2, maxWidth: 900 }}>
                <Typography sx={{ color: "primary.main", p: "8px 4px" }} variant='h6'>Add Product</Typography>
                <Grid container spacing={2} >
                    <Grid item xs={12} md={6}>
                        <CustoTextField
                            error={titleState}
                            errorMsg="The title should consists of 6 letters at least"
                            label="Product Title"
                            name="title"
                        >
                            <Subtitles sx={iconsStyle} />
                        </CustoTextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustoTextField
                            error={priceState}
                            errorMsg="The price should be positive number"
                            label="Price"
                            name="price"
                        >
                            <AttachMoney sx={iconsStyle} />
                        </CustoTextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustoTextField
                            error={seriesState}
                            errorMsg="Series name should consists of 2 letters at least"
                            label="Series"
                            name="series"
                        >
                            <LiveTv sx={iconsStyle} />
                        </CustoTextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustoTextField
                            error={imageState}
                            errorMsg="File type most be image type"
                            type='file'
                            name='image'
                            placeholder='seeeeeeeee'
                            sx={{ "& input[type=file]::file-selector-button": { display: "none" } }}
                        >
                            <AddPhotoAlternate sx={iconsStyle} />
                        </CustoTextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Class sx={iconsStyle} />
                            <FormControl
                                variant="outlined"
                                fullWidth
                                error={!categoryState}
                                sx={{ bgcolor: "primary.sub" }}
                            >
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category"
                                    value={selectCategory}
                                    onChange={handleSlectCategory}
                                    label="Category"
                                >
                                    <MenuItem value={"none"}>None</MenuItem>
                                    {catagoriesInfo.map(cat => <MenuItem key={cat.name} value={cat.name}>{cat.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Box>
                        <Typography sx={errorMsgStyle}>{!categoryState && "You have to select category of product"}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustoTextField
                            error={amountState}
                            errorMsg="amount of this product should be positive number"
                            label="Amount"
                            name="amount"
                            type="number"
                        >
                            <AllInbox sx={iconsStyle} />
                        </CustoTextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Description sx={iconsStyle} />
                            <TextField name="description"
                                fullWidth
                                multiline
                                error={!descriptionState}
                                minRows={4}
                                sx={{ bgcolor: "primary.sub" }}
                                label="Description"
                                variant='outlined'
                            />
                        </Box>
                        <Typography sx={errorMsgStyle}>{!descriptionState && "You have to describe this product by 20 letters at least"}</Typography>
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
            </Box>
        </Box>
    )
}
