import useGetApi from "./useGetApi"

export interface SeriesType {
    series: string,
    value: number
}

export interface TopSeriesType {
    topEarnings: SeriesType[],
    topSold: SeriesType[]
}

export default function useTopSeries() {

    const queryKey = "top-series";

    return useGetApi<TopSeriesType>({
        key: [queryKey],
        path: `statistics/?queryKey=${queryKey}&limit=5`
    })
}