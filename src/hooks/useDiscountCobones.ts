import useGetApi from "./useGetApi";
import { useQueryClient } from '@tanstack/react-query';

export type CoboneType = {
    id: string,
    name: string,
    value: number,
    isNew?: boolean
}

export default function useDiscountCobones() {

    const path = "settings/cobones";
    const {
        data, isFetching: isLoading,
        isError,
        refetch
    } = useGetApi<CoboneType[]>({ path, key: [path] });

    const queryClient = useQueryClient();

    function deleteCobone(coboneId: string) {
        queryClient.setQueryData<CoboneType[]>([path], (data) => {
            return data?.filter(cobone => cobone.id !== coboneId)
        })
    }

    function addCobone(cobone: CoboneType) {
        queryClient.setQueryData<CoboneType[]>([path], (data) => {
            if (data) { return [cobone, ...data] }
            else return [cobone]
        })
    }

    return {
        cobones: data,
        isLoading,
        isError,
        refetch,
        addCobone,
        deleteCobone
    }
}
