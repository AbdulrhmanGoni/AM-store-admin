import useGetApi from "./useGetApi";

export default function useMonthlyStatistics() {

    const query = "monthly-statistics"
    const path = `statistics/?get=${query}`;
    const { data, isError, isLoading } = useGetApi({ key: [query], path });

    return {
        data,
        isLoading,
        isError
    }
}
