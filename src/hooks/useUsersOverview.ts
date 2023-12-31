import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useApiRequest from "./useApiRequest";
import host from "../CONSTANTS/API_hostName";

interface UseUsersOverviewType {
    isThereNextPage: boolean,
    users: {
        avatar: string,
        userName: string,
        userEmail: string,
        userOrders: number,
        hisEmailVerified: boolean
    }[]
}

export default function useUsersOverview() {

    const { api } = useApiRequest();
    const [page, setPage] = useState<number>(1);
    const [pageSize] = useState<number>(6);
    const query = "users-overview";
    const path = `statistics/?queryKey=${query}&pageSize=${pageSize}&page=`;

    const fetchUsers = (page = 1) => api.get(`${host}/${path}` + page).then(({ data }) => data)

    function navigate(dier: "next" | "previous") {
        setPage(currentPage => {
            if (dier === "next") return ++currentPage
            if (dier === "previous") return --currentPage
            return currentPage
        })
    }

    const { isFetching, isError, data, refetch } = useQuery<UseUsersOverviewType>({
        queryKey: [query, page],
        queryFn: () => fetchUsers(page),
        keepPreviousData: true
    })

    return {
        usersData: data?.users,
        isLoading: isFetching,
        isError,
        refetch,
        navigate,
        page,
        pageSize,
        isThereNextPage: !!data?.isThereNextPage
    }
}