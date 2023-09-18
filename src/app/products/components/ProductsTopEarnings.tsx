import { Chip } from '@mui/material'
import { AttachMoney } from '@mui/icons-material';
import { nDecorator } from '@abdulrhmangoni/am-store-library'
import { ListTitle, ProductsListDisplayer, RecieverProps } from './ProductsListComponents';

export default function ProductsTopEarnings({ data, isLoading, isError }: RecieverProps) {

    return (
        <>
            <ListTitle
                title='Top Earnings'
                subTitle='The top products that achieve earnings'
                icon={<AttachMoney />}
            />
            <ProductsListDisplayer
                data={data}
                isLoading={isLoading}
                isError={isError}
                onRightElement={(product: { earnings: number }) => {
                    return <Chip label={`$${nDecorator(product.earnings?.toFixed(2))}`} />
                }}
            />
        </>
    )
}
