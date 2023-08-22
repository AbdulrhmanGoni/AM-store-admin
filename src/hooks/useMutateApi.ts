import { useMutation } from '@tanstack/react-query'
import { host } from '@/CONSTANT/API_hostName';
import useApiRequest from './useApiRequest';


interface params { key: string[], path: string, moreProps?: {} }
interface funParams { body: any, method?: "put" | "post" | "delete" }

export default function useMutateApi(props: params) {
    const { key, path, moreProps } = props;
    const { api } = useApiRequest();

    async function theFunc({ method, body }: funParams) {
        if (method === "delete") {
            return (await api.delete(`${host}${path}`, { data: body })).data
        } else {
            return (await api[method ?? "post"](`${host}${path}`, body)).data
        }
    }

    return useMutation({
        mutationFn: async (params: funParams) => await theFunc(params),
        mutationKey: key,
        ...moreProps
    })
}
