import { useEffect, useState } from 'react'
import useApiRequest from './useApiRequest';
import host from '../CONSTANTS/API_hostName';
import { productData } from '../types/dataTypes';

export default function useProductsPagination({ productsLength }: { productsLength: number }) {
    
    const { api } = useApiRequest();
    const [products, setProducts] = useState<productData[]>([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });
    const [loadedPages, setLoadedPages] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(true);
    const [thereIsMore, setThereIsMore] = useState<boolean>(true);

    async function getProducts({ pageSize, page }: { pageSize: number, page: number }) {
        const returnType = "_rate,_comments,_updatedAt,_createdAt"
        const query = `pageSize=${pageSize}&page=${++page}&returnType=${returnType}`
        try { return (await api.get(`${host}/products/pagination?${query}`)).data }
        catch { return null }
    }

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

    useEffect(() => { 
        productsLength && products.length >= productsLength && setThereIsMore(false) 
    }, [products, productsLength])

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
