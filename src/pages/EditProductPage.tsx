import { Container, Paper, Typography } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { SearchForProductsField } from '@abdulrhmangoni/am-store-library'
import host from '../CONSTANTS/API_hostName'
import { useNavigate, useParams } from 'react-router-dom'
import EditProductForm from '../components/products-pages/EditProductForm'

export default function EditProductPage() {

    const { productId } = useParams();
    const navigate = useNavigate()

    return (
        <Container maxWidth="md">
            <Paper sx={{ p: 1, mb: 2 }}>
                <Typography variant='h5' sx={{ pl: "13px" }}>Edit Product</Typography>
                <Typography
                    variant='subtitle1'
                    sx={{ p: "0px 0px 16px 13px", fontSize: "1.1rem" }}>
                    Search for a product and edit it
                </Typography>
                <SearchForProductsField
                    actionWithProductId={(id) => navigate(`/products/edit-product/${id}`)}
                    endItemIcon={<Edit />}
                    hostName={host}
                />
            </Paper>
            {productId && <EditProductForm productId={productId} />}
        </Container>
    )
}