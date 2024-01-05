import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import host from "../CONSTANTS/API_hostName";
import useApiRequest from "./useApiRequest";

interface UseYearStatisticsOptions {
    dataPropertyName: string
}

export default function useYearStatistics<T>(queryKey: string, { dataPropertyName }: UseYearStatisticsOptions) {

    const { api } = useApiRequest();

    async function getStatistics(year: number) {
        const path = `statistics/?queryKey=${queryKey}&year=${year}`;
        return (await api.get(`${host}/${path}`)).data
    }

    const initialYear = new Date().getFullYear()
    const [currentYear, setCurrentYear] = useState<number>(initialYear);
    const [queries, setQueries] = useState([
        {
            queryKey: [queryKey, initialYear],
            queryFn: () => getStatistics(initialYear)
        }
    ])

    const results = useQueries({ queries })

    const currentYearData = results[queries.findIndex(({ queryKey }) => queryKey[1] == currentYear)]

    return {
        currentYear,
        data: currentYearData?.data?.[dataPropertyName] as T,
        setYear(year: number) {
            setCurrentYear(year);
            setQueries((queries) => {
                const isNewYear = !results.some(({ data }) => data?.year === year)
                if (isNewYear) {
                    return [
                        ...queries,
                        {
                            queryKey: [queryKey, year],
                            queryFn: () => getStatistics(year)
                        }
                    ]
                }
                return queries
            })
        },
        isLoading: currentYearData?.isFetching,
        isError: currentYearData?.isError,
        refetch: currentYearData?.refetch
    }
}
