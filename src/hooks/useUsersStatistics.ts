import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useApiRequest from "./useApiRequest";
import host from "../CONSTANTS/API_hostName";

export interface UseUsersDataType {
    avatar: string,
    userName: string,
    userEmail: string,
    userOrders: number,
    isEmailVerified: boolean
}

export default function useUsersStatistics() {

    const { api } = useApiRequest()
    const [page, setPage] = useState<number>(1)
    const [pageSize] = useState<number>(6)
    const query = "users-overview";
    const path = `statistics/?get=${query}&limit=${pageSize}&page=`;

    const fetchUsers = (page = 1) => api.get(`${host}/${path}` + page).then(({ data }) => data)

    function navigate(dier: "next" | "previous") {
        setPage(currentPage => {
            if (dier === "next") return ++currentPage
            if (dier === "previous") return --currentPage
            return currentPage
        })
    }

    const { isFetching, isError, data } = useQuery({
        queryKey: [query, page],
        queryFn: () => fetchUsers(page),
        keepPreviousData: true,
        refetchOnWindowFocus: false
    })

    return {
        usersData: data?.users,
        isLoading: isFetching,
        isError,
        navigate,
        page,
        pageSize,
        isThereNextPage: !!data?.isThereNextPage
    }
}