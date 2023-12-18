import { Container, Paper } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { SearchForProductsField, P } from '@abdulrhmangoni/am-store-library'
import host from '../CONSTANTS/API_hostName'
import { useNavigate, useParams } from 'react-router-dom'
import EditProductForm from '../components/products-pages/EditProductForm'

export default function EditProductPage() {

    const { productId } = useParams();
    const navigate = useNavigate()

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
            {productId && <EditProductForm productId={productId} />}
        </Container>
    )
}