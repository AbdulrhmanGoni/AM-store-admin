import { Box, InputAdornment, TextField, useMediaQuery } from "@mui/material";
import MONTHES from "../../CONSTANTS/MONTHES";
import SelectBox from "../SelectBox";
import SettingBox from "./SettingBox";
import useMonthlySalesStatistics from "../../hooks/useMonthlySalesStatistics";
import SettingBoxLoading from "./SettingBoxLoading";
import { useState } from "react";
import SettingActionsButtons from "./SettingActionsButtons";
import useStatisticsActions, { UpdateMonthTargetDetails } from "../../hooks/useStatisticsActions";

export default function SetMonthlyTargetsSetting() {

    const { data, currentYear, setYear, isLoading, updateMonthlySalesStatistics } = useMonthlySalesStatistics();
    const { updateMonthTarget } = useStatisticsActions()
    const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(new Date().getMonth());
    const [newTarget, setNewTarget] = useState<number>();
    const [changeLoading, setChangeLoading] = useState<boolean>();
    const xxSmallScreens = useMediaQuery("(max-width: 400px)");

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
                <Box sx={{ display: "flex", gap: 1, flexWrap: xxSmallScreens ? "wrap" : "nowrap" }}>
                    <SelectBox
                        values={[new Date().getFullYear(), new Date().getFullYear() + 1]}
                        onSelect={(value) => {
                            setYear(+value)
                            setSelectedMonthIndex(+value > new Date().getFullYear() ? 0 : new Date().getMonth())
                            cancelChanges()
                        }}
                        defaultValue={currentYear}
                        size="small"
                        sx={{ flexBasis: "100%", "& .MuiSelect-select": undefined }}
                    />
                    <SelectBox
                        values={MONTHES.filter((_month, index) => {
                            return currentYear > new Date().getFullYear() ? true : index >= new Date().getMonth()
                        })}
                        defaultValue={MONTHES[selectedMonthIndex]}
                        onSelect={(_value, index) => {
                            setSelectedMonthIndex(currentYear > new Date().getFullYear() ? index : index + new Date().getMonth())
                            cancelChanges()
                        }}
                        size="small"
                        sx={{ flexBasis: "100%", "& .MuiSelect-select": undefined }}
                    />
                    <TextField
                        size="small"
                        sx={{ flexBasis: "100%" }}
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
