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

    const query = "top-series";

    return useGetApi<TopSeriesType>({
        key: [query],
        path: `statistics/?queryKey=${query}&limit=5`
    })
}