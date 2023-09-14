import { Chip } from '@mui/material'
import { Star } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { nDecorator } from '@abdulrhmangoni/am-store-library'
import useStatisticsQueries from '@/hooks/useStatisticsQueries'
import { ListTitle, ProductsListDisplayer } from './ProductsListComponents'


export default function ProductsTopSales() {

    const { get_products_topSales } = useStatisticsQueries();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["top-sales"],
        queryFn: () => get_products_topSales(5)
    })

    return (
        <>
            <ListTitle
                title="Top Selling"
                subTitle="The top products that sold"
                icon={<Star />}
            />
            <ProductsListDisplayer
                data={data}
                isLoading={isLoading}
                isError={isError}
                onRightElement={(product: { sold: string | number }) => {
                    return <Chip label={`Sold: ${nDecorator(product.sold)}`} />
                }}
            />
        </>
    )
}