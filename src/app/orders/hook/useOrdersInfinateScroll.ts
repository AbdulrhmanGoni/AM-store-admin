import useMutateApi from "@/hooks/useMutateApi";
import useNotifications from "@/hooks/useNotifications";
import { useState, useEffect } from "react";


export default function useOrdersInfinateScroll() {

    const { bySteps, promised } = useNotifications();
    const [orders, setOrders] = useState<any[]>([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });
    const [loadedPages, setLoadedPages] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(true);
    const [thereIsMore, setThereIsMore] = useState<boolean>(true);

    const { mutateAsync: updateProduct } = useMutateApi({ key: ["edit-product"], path: "admin/products?type=update-product" });
    const { mutateAsync: deleteProduct } = useMutateApi({ key: ["delete-product"], path: "admin/products" });

    useEffect(() => {
        
    }, [])


    return {
        orders,
        paginationModel,
        setPaginationModel,
        loadedPages,
        isLoading,
        isError,
        thereIsMore
    }
}
