import { Chip } from '@mui/material'
import { AttachMoney } from '@mui/icons-material';
import { nDecorator } from '@abdulrhmangoni/am-store-library'
import { ListTitle, ProductsListDisplayer, TopProductsList } from './ProductsListComponents';

export default function ProductsTopEarnings({ productsList, isLoading, isError }: TopProductsList) {

    return (
        <>
            <ListTitle
                title='Top Earnings'
                subTitle='The top products that achieve earnings'
                icon={<AttachMoney />}
            />
            <ProductsListDisplayer
                productsList={productsList}
                isLoading={isLoading}
                isError={isError}
                onRightElement={(product: { earnings: number }) => {
                    return <Chip sx={{ borderRadius: 1 }} label={`$${nDecorator(product.earnings?.toFixed(2))}`} />
                }}
            />
        </>
    )
}
