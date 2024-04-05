import useSettings from "../../hooks/useSettings";
import NumberSettingBox from "./NumberSettingBox";
import SettingBoxLoading from "./SettingBoxLoading";

export default function DeliveryPriceSetting() {

    const { data, isLoading, updateSetting } = useSettings()

    async function onSaveChanges(newValue: number) {
        await updateSetting("deliveryPrice", newValue)
            .then((res) => { console.log(res) })
    }

    return (
        isLoading ? <SettingBoxLoading />
            : <NumberSettingBox<number>
                title="Delevery Price $"
                description="Shipping cost"
                initialValue={data?.deliveryPrice}
                inputStartIcon="$"
                onSaveChanges={onSaveChanges}
            />
    )
}
