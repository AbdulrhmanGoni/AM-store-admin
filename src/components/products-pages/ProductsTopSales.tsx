import { Chip } from '@mui/material'
import { Star } from '@mui/icons-material'
import { nDecorator } from '@abdulrhmangoni/am-store-library'
import { ListTitle, ProductsListDisplayer, TopProductsList } from './ProductsListComponents'


export default function ProductsTopSales({ productsList, isLoading, isError }: TopProductsList) {

    return (
        <>
            <ListTitle
                title="Top Selling"
                subTitle="The top products that sold"
                icon={<Star />}
            />
            <ProductsListDisplayer
                productsList={productsList}
                isLoading={isLoading}
                isError={isError}
                onRightElement={(product: { sold: string | number }) => {
                    return <Chip sx={{ borderRadius: 1 }} label={`Sold: ${nDecorator(product.sold)}`} />
                }}
            />
        </>
    )
}