import { useContext, useEffect, useState } from 'react';
import { productData } from '../types/dataTypes';
import { ProductsCategoriesFilterContext } from '../components/products-pages/ProductsCategoriesFilterProvider';
import useProductsActions from './useProductsActions';

export default function useProductsPagination() {

    const [rendered, setRendered] = useState(false);
    const [products, setProducts] = useState<productData[]>([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });
    const [loadedPages, setLoadedPages] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(true);
    const [thereIsMore, setThereIsMore] = useState(true);
    const [triggerFetch, setTriggerFetch] = useState(0);
    const { paginateProducts } = useProductsActions();
    const { categories } = useContext(ProductsCategoriesFilterContext);

    useEffect(() => {
        if (!loadedPages.includes(paginationModel.page) && thereIsMore) {
            setIsLoading(true);
            paginateProducts({ ...paginationModel, categories })
                .then(data => {
                    if (data) {
                        if (paginationModel.page === 0) {
                            setProducts(data.products)
                            setLoadedPages([paginationModel.page])
                        } else {
                            setProducts(state => state.concat(data.products))
                            setLoadedPages(state => [...state, paginationModel.page])
                        }
                        !data.thereIsNextPage && setThereIsMore(false)
                        isError && setIsError(false)
                    } else setIsError(true)
                })
                .finally(() => setIsLoading(false))
        }
    }, [triggerFetch, paginationModel.page]);

    useEffect(() => {
        if (rendered) {
            setThereIsMore(true);
            setLoadedPages([]);
            setPaginationModel({ page: 0, pageSize: 20 });
            setTriggerFetch(n => ++n);
        }
    }, [categories])

    useEffect(() => { setRendered(true) }, []);

    return {
        products,
        paginationModel,
        setPaginationModel,
        isLoading,
        isError,
        thereIsMore,
        loadedPages
    }
}
