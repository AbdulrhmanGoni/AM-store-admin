import { UseQueryResult, useQuery } from '@tanstack/react-query'
import host from '../CONSTANTS/API_hostName';
import useApiRequest from './useApiRequest';

interface Params {
    key: (string | number)[],
    path: string
}

export default function useGetApi<ReturnedDataType>(props: Params): UseQueryResult<ReturnedDataType> {
    const { api } = useApiRequest();
    const { key, path } = props;
    async function theFunc() { return (await api.get(`${host}/${path}`)).data }
    return useQuery({
        queryKey: key,
        queryFn: theFunc,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
}
