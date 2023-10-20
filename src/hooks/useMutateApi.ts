import { MutationKey, useMutation } from '@tanstack/react-query'
import { host } from '../CONSTANT/API_hostName';
import useApiRequest from './useApiRequest';
import { JSX } from 'react';


interface params { key: MutationKey, path: string }
interface funParams {
    body: JSX.Element | string | number,
    method?: "put" | "post" | "delete"
}

export default function useMutateApi(props: params) {
    const { key, path } = props;
    const { api } = useApiRequest();

    async function theFunc({ method, body }: funParams) {
        if (method === "delete") {
            return (await api.delete(`${host}/${path}`, { data: body })).data
        } else {
            return (await api[method ?? "post"](`${host}/${path}`, body)).data
        }
    }

    return useMutation({
        mutationFn: async (params: funParams) => await theFunc(params),
        mutationKey: key,
    })
}
