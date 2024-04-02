import useSettings from "../../hooks/useSettings";
import SettingBox from "./SettingBox";
import SettingBoxLoading from "./SettingBoxLoading";

export default function FreeDeliveryEntitlementSetting() {

    const { data, isLoading, updateSetting } = useSettings();

    async function onSaveChanges(newValue: number) {
        await updateSetting("deliveryPrice", { limit: newValue, value: data?.deliveryPrice.value as number })
            .then((res) => { console.log(res) })
    }

    return (
        isLoading ? <SettingBoxLoading />
            : <SettingBox<number>
                title="Free delevery entitlement"
                description="The minimum total price that worthes a free delevery"
                initialValue={data?.deliveryPrice.limit}
                inputStartIcon="$"
                onSaveChanges={onSaveChanges}
            />
    )
}
