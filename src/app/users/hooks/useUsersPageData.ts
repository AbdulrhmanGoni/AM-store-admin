import useGetApi from '@/hooks/useGetApi';
import { useGridApiRef } from '@mui/x-data-grid';

export default function useUsersPageData() {

    const tableRef = useGridApiRef()

    let query = "users-statistics"
    const path = `statistics/?get=${query}`;
    const { data: usersData, isError: usersDataError, isLoading: usersDataAreLoading } = useGetApi({ key: [query], path });

    return {
        usersData,
        usersDataAreLoading,
        usersDataError,
        tableRef
    }
}
