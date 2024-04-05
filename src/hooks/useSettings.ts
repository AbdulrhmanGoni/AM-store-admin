import { useQueryClient } from "@tanstack/react-query"
import useGetApi from "./useGetApi"
import useSettingsActions from "./useSettingsActions"

interface Settings {
    discountCobones: [
        {
            id: string,
            name: string,
            value: number
        }
    ],
    productsCategories: string[],
    allowUsersChangePasswordEveryNDays: number,
    defaultMonthlyTarget: number,
    deliveryPrice: number,
    minFreeDeliveryEntitlementPrice: number
}

type SettingsValues = Settings[
    "allowUsersChangePasswordEveryNDays" |
    "deliveryPrice" |
    "minFreeDeliveryEntitlementPrice" |
    "defaultMonthlyTarget" |
    "productsCategories" |
    "discountCobones"
]

export default function useSettings() {

    const { changeSetting } = useSettingsActions()
    const queryClient = useQueryClient()
    const { data, isLoading, isError, refetch } = useGetApi<Settings>({
        key: ["settings"],
        path: "settings"
    })

    async function updateSetting(setting: keyof Settings, newValue: SettingsValues) {
        return await changeSetting({ setting, newValue })
            .then((res) => {
                if (res) {
                    queryClient.setQueryData<Settings>(["settings"], (data) => {
                        return data && {
                            ...data,
                            [setting]: newValue
                        }
                    })
                    return true
                }
                return false
            })
            .catch(() => false)
    }

    return {
        data,
        isLoading,
        isError,
        refetch,
        updateSetting
    }
}