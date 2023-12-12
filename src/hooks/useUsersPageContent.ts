import useGetApi from "./useGetApi";

interface UsersStatisticsType {
    usersCount: number,
    verifiedUsers: number,
    customersCount: number
}
const defaultStatistics = {
    usersCount: 0,
    verifiedUsers: 0,
    customersCount: 0
}

export default function useUsersPageContent() {
    const queryKey = "users-statistics", path = `statistics?get=${queryKey}`;
    const {
        data: usersStatistics = defaultStatistics,
        isLoading,
        isError
    } = useGetApi<UsersStatisticsType>({ path, key: [queryKey] })

    return {
        usersStatistics,
        isLoading,
        isError
    }
}
