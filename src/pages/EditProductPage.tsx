import { Container, Paper } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { SearchForProductsField, P, IllustrationCard } from '@abdulrhmangoni/am-store-library'
import host from '../CONSTANTS/API_hostName'
import { useNavigate, useParams } from 'react-router-dom'
import EditProductForm from '../components/products-pages/EditProductForm'
import { useState } from 'react'

export default function EditProductPage() {

    const { productId } = useParams();
    const navigate = useNavigate();
    const [openEditForm, setOpenEditForm] = useState(true);

    function closeEditForm() {
        setOpenEditForm(false);
        navigate("/products/edit-product")
    }

    return (
        <Container maxWidth="md">
            <Paper sx={{ p: 1, mb: 2 }}>
                <P variant='h5' sx={{ pl: "13px" }}>Edit Product</P>
                <P
                    variant='subtitle1'
                    sx={{ p: "0px 0px 16px 13px", fontSize: "1.1rem" }}>
                    Search for a product and edit it
                </P>
                <SearchForProductsField
                    actionWithProductId={(id) => navigate(`/products/edit-product/${id}`)}
                    endItemIcon={<Edit />}
                    hostName={host}
                />
            </Paper>
            {
                productId && openEditForm ? <EditProductForm productId={productId} close={closeEditForm} />
                    : <IllustrationCard
                        title='Search for product to edit'
                        customIllustrator={<img src='/images/search.svg' />}
                        hideAlertMsg
                        style={{ "& > div": { minWidth: "100%" } }}
                    />
            }
        </Container>
    )
}