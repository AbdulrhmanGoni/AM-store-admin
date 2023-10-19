"use client"
import { Paper, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Edit } from '@mui/icons-material'
import { SearchForProductsField } from '@abdulrhmangoni/am-store-library'
import host from '@/CONSTANT/API_hostName'

export default function EditProductPage() {

    const { push } = useRouter()

    return (
        <Paper sx={{ p: 1 }}>
            <Typography variant='h5' sx={{ pl: "13px" }}>Edit Product</Typography>
            <Typography
                variant='subtitle1'
                sx={{ p: "0px 0px 16px 13px", fontSize: "1.1rem" }}>
                Search for a product and edit it
            </Typography>
            <SearchForProductsField
                actionWithProductId={(id) => push(`products/edit-product/${id}`)}
                endItemIcon={<Edit />}
                hostName={host}
            />
        </Paper>
    )
}