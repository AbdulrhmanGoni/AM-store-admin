import host from "../CONSTANTS/API_hostName";
import useApiRequest from "./useApiRequest";

export default function useSettingsActions() {

    const { api } = useApiRequest();

    const path = (additionalPath: string = "") => `${host}/settings/${additionalPath}`;

    async function changeSetting(change: { setting: string, newValue: unknown }) {
        return (await api.post(path(), change)).data
    }

    return {
        changeSetting
    }
}
