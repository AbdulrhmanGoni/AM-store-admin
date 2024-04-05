import { Box, InputAdornment, TextField } from "@mui/material";
import MONTHES from "../../CONSTANTS/MONTHES";
import SelectBox from "../SelectBox";
import SettingBox from "./SettingBox";
import useMonthlySalesStatistics from "../../hooks/useMonthlySalesStatistics";
import SettingBoxLoading from "./SettingBoxLoading";
import { useState } from "react";
import SettingActionsButtons from "./SettingActionsButtons";
import useStatisticsActions, { UpdateMonthTargetDetails } from "../../hooks/useStatisticsActions";

export default function SetMonthlyTargetsSetting() {

    const { data, isLoading, currentYear, updateMonthlySalesStatistics } = useMonthlySalesStatistics();
    const { updateMonthTarget } = useStatisticsActions()
    const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(new Date().getMonth());
    const [newTarget, setNewTarget] = useState<number>();
    const [changeLoading, setChangeLoading] = useState<boolean>();

    const currentMonthTarget = newTarget || data?.[selectedMonthIndex].earningsTarget

    function setMonthTarget({ year, monthIndex, newTarget }: UpdateMonthTargetDetails) {
        updateMonthlySalesStatistics(year, (monthes) => {
            return monthes.map((month, index) => {
                if (index === monthIndex) {
                    return {
                        ...month,
                        earningsTarget: newTarget
                    }
                }
                return month
            })
        })
    }

    function saveChanges() {
        if (newTarget) {
            const updateDetails = {
                year: currentYear,
                monthIndex: selectedMonthIndex,
                newTarget
            }
            setChangeLoading(true)
            updateMonthTarget(updateDetails)
                .then((res) => {
                    console.log(res)
                    setNewTarget(undefined)
                    setMonthTarget(updateDetails)
                })
                .finally(() => setChangeLoading(false))
        }
    }

    function cancelChanges() {
        setNewTarget(undefined)
    }

    return (
        isLoading ? <SettingBoxLoading />
            : <SettingBox
                title="Edit monthes targets of earnings"
                description="Edit the target of the current month or the future monthes"
                actionsSection={
                    <SettingActionsButtons
                        open={!!newTarget && newTarget !== data?.[selectedMonthIndex].earningsTarget}
                        isLoading={changeLoading}
                        saveAction={saveChanges}
                        cancelAction={cancelChanges}
                    />
                }
            >
                <Box sx={{ display: "flex", gap: 1 }}>
                    <SelectBox
                        onSelect={(_value, index) => {
                            setSelectedMonthIndex(index + new Date().getMonth())
                            setNewTarget(undefined)
                        }}
                        values={MONTHES.filter((_month, index) => index >= new Date().getMonth())}
                        size="small"
                        sx={{ minWidth: "80px", "& .MuiSelect-select": undefined }}
                    />
                    <TextField
                        size="small"
                        sx={{ width: "100%" }}
                        type="number"
                        onChange={({ target: { value } }) => {
                            setNewTarget(+value)
                        }}
                        // disabled={!editMode}
                        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                        value={currentMonthTarget}
                    />
                </Box>
            </SettingBox>
    )
}
