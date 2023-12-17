import host from "../CONSTANTS/API_hostName";
import useApiRequest from "./useApiRequest";


export default function useDiscountsCobonesActions() {

    const { api } = useApiRequest();

    const path = `${host}/settings/cobones`;

    async function addDiscountCobone(cobone: { name: string, value: number }) {
        return (await api.post(path, { cobone })).data
    }

    async function deleteDiscountCobone(coboneId: string) {
        return (await api.delete(path, { data: { coboneId } })).data
    }

    return {
        deleteDiscountCobone,
        addDiscountCobone
    }
}
