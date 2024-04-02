import useSettings from "../../hooks/useSettings";
import SettingBox from "./SettingBox";
import SettingBoxLoading from "./SettingBoxLoading";

export default function DeliveryPriceSetting() {

    const { data, isLoading, updateSetting } = useSettings()

    async function onSaveChanges(newValue: number) {
        await updateSetting("deliveryPrice", { value: newValue, limit: data?.deliveryPrice.limit as number })
            .then((res) => { console.log(res) })
    }

    return (
        isLoading ? <SettingBoxLoading />
            : <SettingBox<number>
                title="Delevery Price $"
                description="Shipping cost"
                initialValue={data?.deliveryPrice.value}
                inputStartIcon="$"
                onSaveChanges={onSaveChanges}
            />
    )
}
