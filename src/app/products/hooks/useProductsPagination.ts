import { useEffect, useState } from 'react'
import useApiRequest from '@/hooks/useApiRequest';
import host from '@/CONSTANT/API_hostName';

function useGetProducts() {
    const { api } = useApiRequest();

    async function getProducts({ pageSize, page }) {
        let returnType = "_rate,_comments,_updatedAt,_createdAt"
        let query = `pageSize=${pageSize}&page=${++page}&returnType=${returnType}`
        try { return (await api.get(`${host}products/pagination?${query}`)).data }
        catch { return null }
    }
    return { getProducts }
}



export default function useProductsPagination({ productsLength }) {

    const { getProducts } = useGetProducts();
    const [products, setProducts] = useState<any[]>([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });
    const [loadedPages, setLoadedPages] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(true);
    const [thereIsMore, setThereIsMore] = useState<boolean>(true);

    useEffect(() => {
        if (!loadedPages.includes(paginationModel.page) && thereIsMore) {
            setIsLoading(true)
            getProducts(paginationModel)
                .then(data => {
                    if (data) {
                        setProducts(state => state.concat(data))
                        setLoadedPages(state => [...state, paginationModel.page])
                        isError && setIsError(false)
                    } else setIsError(true)
                })
                .finally(() => setIsLoading(false))
        }
    }, [paginationModel.page])

    useEffect(() => { products.length >= productsLength && setThereIsMore(false) }, [products, productsLength])

    return {
        products,
        productsLength,
        paginationModel,
        setPaginationModel,
        isLoading,
        isError,
        thereIsMore
    }
}
