// /* eslint-disable @typescript-eslint/no-explicit-any */
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import host from '../CONSTANT/API_hostName';
import useApiRequest from './useApiRequest';

interface params {
    key: string[],
    path: string,
    moreProps?: UseQueryOptions<() => Promise<unknown>, Error>
}

export default function useGetApi(props: params) {
    const { api } = useApiRequest();
    const { key, path, moreProps } = props;
    async function theFunc() { return (await api.get(`${host}/${path}`)).data }
    return useQuery({
        queryKey: key,
        queryFn: theFunc,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        ...moreProps
    })
}
