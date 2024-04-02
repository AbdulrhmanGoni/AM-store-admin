import useSettings from "../../hooks/useSettings";
import SettingBox from "./SettingBox";
import SettingBoxLoading from "./SettingBoxLoading";

export default function DefaultMonthlyTargetSetting() {

    const { data, isLoading, updateSetting } = useSettings()

    async function onSaveChanges(newValue: number) {
        await updateSetting("defaultMonthlyTarget", newValue)
            .then((res) => {
                console.log(res)
            })
    }

    return (
        isLoading ? <SettingBoxLoading />
            : <SettingBox<number>
                title="Default monthly target"
                description="The value which will set automaticly as target of the monthes that don't have target"
                initialValue={data?.defaultMonthlyTarget}
                inputStartIcon="$"
                onSaveChanges={onSaveChanges}
            />
    )
}
