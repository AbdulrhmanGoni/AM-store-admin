import useGetApi from "./useGetApi"

export interface SeriesType {
    series: string,
    value: number
}

export interface TopSeriesesType {
    topEarnings: SeriesType[],
    topSold: SeriesType[]
}

export default function useTopSerieses() {

    const query = "top-serieses";

    return useGetApi<TopSeriesesType>({
        key: [query],
        path: `statistics/?get=&{query}&limit=5`
    })
}