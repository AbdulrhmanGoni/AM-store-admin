import useGetApi from "./useGetApi";
import { useState } from "react";


export default function useOrdersInfinateScroll() {

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });

    const { data: orders, isError, isLoading } = useGetApi({
        key: ["latest-orders"],
        path: `statistics/?get=orders-get-latest&limit=10`
    })

    return {
        orders,
        paginationModel,
        setPaginationModel,
        isLoading,
        isError,
    }
}
