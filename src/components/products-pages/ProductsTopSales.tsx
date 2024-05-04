import { Chip } from '@mui/material'
import { Star } from '@mui/icons-material'
import { nDecorator, PromiseState } from '@abdulrhmangoni/am-store-library'
import ProductsListTitle from './ProductsListTitle'
import { ProductData } from './TopProductsContainer'
import ProductsListDisplayer from './ProductsListDisplayer'

interface ProductsTopSalesProps extends PromiseState {
    productsList?: ProductData[],
    refetch?: () => void
}

export default function ProductsTopSales({ productsList, isLoading, isError, refetch }: ProductsTopSalesProps) {

    return (
        <>
            <ProductsListTitle
                title="Top Selling"
                subTitle="The top products that sold"
                icon={<Star />}
            />
            <ProductsListDisplayer
                productsList={productsList}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
                onRightElement={(product: { sold: string | number }) => {
                    return <Chip sx={{ borderRadius: 1 }} label={`Sold: ${nDecorator(product.sold)}`} />
                }}
            />
        </>
    )
}