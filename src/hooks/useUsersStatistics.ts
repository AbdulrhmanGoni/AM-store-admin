import useGetApi from "./useGetApi";

export interface UseUsersDataType {
    avatar: string,
    userName: string,
    userEmail: string,
    userOrders: number
}

export default function useUsersStatistics() {

    let query = "users-statistics"
    const path = `statistics/?get=${query}`;
    const {
        data: usersData,
        isError,
        isLoading
    } = useGetApi({ key: [query], path });

    return {
        usersData,
        isLoading,
        isError
    }
}