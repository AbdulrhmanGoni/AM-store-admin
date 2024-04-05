import useSettings from "../../hooks/useSettings";
import NumberSettingBox from "./NumberSettingBox";
import SettingBoxLoading from "./SettingBoxLoading";

export default function FreeDeliveryEntitlementSetting() {

    const { data, isLoading, updateSetting } = useSettings();

    async function onSaveChanges(newValue: number) {
        await updateSetting("minFreeDeliveryEntitlementPrice", newValue)
            .then((res) => { console.log(res) })
    }

    return (
        isLoading ? <SettingBoxLoading />
            : <NumberSettingBox<number>
                title="Free delevery entitlement"
                description="The minimum total price that worthes a free delevery"
                initialValue={data?.minFreeDeliveryEntitlementPrice}
                inputStartIcon="$"
                onSaveChanges={onSaveChanges}
            />
    )
}
