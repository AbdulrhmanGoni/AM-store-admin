import { useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { TargetProgressLine } from '../TargetProgress'
import { ElementWithLoadingState, nDecorator } from '@abdulrhmangoni/am-store-library'
import SelectBox from '../SelectBox'
import SvgIcon from '../SvgIcon'
import { targetIcon } from '../targetIcon'
import { MonthlyStatistics } from '../../hooks/useMonthlyStatistics'
import MONTHES from '../../CONSTANT/MONTHES'

interface MonthlyTargetProps extends MonthlyStatistics { }

export default function MonthlyTargets({ monthesData, isLoading }: MonthlyTargetProps) {

    const [monthIndex, setMonthIndex] = useState<number>(new Date().getMonth());
    const [loading, setLoading] = useState<boolean>(false);

    const loadingState = isLoading || loading

    return (
        <Paper sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", gap: 1, p: 2, height: "100%" }}>
            <ElementWithLoadingState
                isLoading={isLoading}
                height={30}
                width="70%"
                element={
                    <Box className="flex-row-center-start" gap={1}>
                        <SvgIcon width={35} height={35} svgElementAsString={targetIcon} />
                        <Typography variant='h6'>Monthly Target</Typography>
                    </Box>
                }
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <ElementWithLoadingState
                    isLoading={loadingState}
                    width={75}
                    height={32}
                    element={
                        <Typography
                            color="success.main"
                            variant='h5'
                        >
                            ${nDecorator(monthesData?.[monthIndex].earningsTarget ?? 0)}
                        </Typography>
                    }
                />
                <ElementWithLoadingState
                    isLoading={isLoading}
                    width={65}
                    height={32}
                    element={
                        <SelectBox
                            values={MONTHES}
                            defaultValue={MONTHES[monthIndex]}
                            onSelect={(_, index) => {
                                setLoading(true)
                                setTimeout(() => {
                                    setMonthIndex(index)
                                    setLoading(false)
                                }, 400)
                            }}
                        />
                    }
                />
            </Box>
            <ElementWithLoadingState
                isLoading={loadingState}
                height={45}
                element={
                    <TargetProgressLine
                        progressStyle={{ height: 15, borderRadius: 1 }}
                        target={monthesData?.[monthIndex].earningsTarget ?? 0}
                        value={monthesData?.[monthIndex].totalEarnings ?? 0}
                    />
                }
            />
        </Paper>
    )
}