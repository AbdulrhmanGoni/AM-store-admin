import host from "../CONSTANTS/API_hostName";
import useApiRequest from "./useApiRequest";

export type UpdateMonthTargetDetails = { year: number, monthIndex: number, newTarget: number }

export default function useStatisticsActions() {

    const { api } = useApiRequest();

    const path = `${host}/statistics/monthly-targets`;

    async function updateMonthTarget(updateDetails: UpdateMonthTargetDetails) {
        return (await api.post(path, updateDetails)).data
    }

    return {
        updateMonthTarget
    }
}
