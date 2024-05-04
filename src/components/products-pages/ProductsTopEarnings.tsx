import { Chip } from '@mui/material'
import { AttachMoney } from '@mui/icons-material';
import { nDecorator, PromiseState } from '@abdulrhmangoni/am-store-library'
import ProductsListTitle from './ProductsListTitle';
import { ProductData } from "./TopProductsContainer";
import ProductsListDisplayer from './ProductsListDisplayer';

interface ProductsTopEarningsProps extends PromiseState {
    productsList?: ProductData[],
    refetch?: () => void
}

export default function ProductsTopEarnings({ productsList, isLoading, isError, refetch }: ProductsTopEarningsProps) {

    return (
        <>
            <ProductsListTitle
                title='Top Earnings'
                subTitle='The top products that achieve earnings'
                icon={<AttachMoney />}
            />
            <ProductsListDisplayer
                productsList={productsList}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
                onRightElement={(product: { earnings: number }) => {
                    return <Chip sx={{ borderRadius: 1 }} label={`$${nDecorator(product.earnings?.toFixed(2))}`} />
                }}
            />
        </>
    )
}
