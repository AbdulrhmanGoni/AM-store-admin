import { Chip } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import { AttachMoney } from '@mui/icons-material';
import { nDecorator } from '@abdulrhmangoni/am-store-library'
import useStatisticsQueries from '@/hooks/useStatisticsQueries';
import { ListTitle, ProductsListDisplayer } from './ProductsListComponents';

export default function ProductsTopEarnings() {

    const { get_products_topEarnings } = useStatisticsQueries();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["top-earnings"],
        queryFn: () => get_products_topEarnings(5)
    })

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
