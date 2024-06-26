import useSettings from "../../hooks/useSettings";
import NumberSettingBox from "./NumberSettingBox";
import SettingBoxLoading from "./SettingBoxLoading";

export default function ChangingUsersPasswordsSetting() {

    const { data, isLoading, updateSetting } = useSettings()

    async function onSaveChanges(newValue: number) {
        await updateSetting("allowUsersChangePasswordEveryNDays", newValue)
            .then((res) => {
                console.log(res)
            })
    }

    return (
        isLoading ? <SettingBoxLoading />
            : <NumberSettingBox<number>
                title="Users passwords life time"
                description="The number of the days that if have passed after password changing users can change their passwords again"
                initialValue={data?.allowUsersChangePasswordEveryNDays}
                inputStartIcon="Days"
                onSaveChanges={onSaveChanges}
            />
    )
}
