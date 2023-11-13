import { useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { TargetProgressLine } from '../TargetProgress'
import { ElementWithLoadingState, nDecorator } from '@abdulrhmangoni/am-store-library'
import SelectBox from '../SelectBox'
import SvgIcon from '../SvgIcon'
import { targetIcon } from '../targetIcon'
import useMonthlySalesStatistics from '../../hooks/useMonthlySalesStatistics'
import MONTHES from '../../CONSTANTS/MONTHES'


export default function MonthlyTargets() {

    const { monthesData, isLoading, year } = useMonthlySalesStatistics();
    const [monthIndex, setMonthIndex] = useState<number>(new Date().getMonth());
    const [loading, setLoading] = useState<boolean>(false);

    const loadingState = isLoading || loading;

    return (
        <Paper className='flex-column j-around gap2 full-height' sx={{ p: 2 }}>
            <Box className="flex-row-center-start gap1">
                <ElementWithLoadingState isLoading={isLoading} width={35} height={35}
                    element={<SvgIcon width={35} height={35} svgElementAsString={targetIcon} />}
                />
                <ElementWithLoadingState isLoading={isLoading} height={30} width={150}
                    element={<Typography flex={1} variant='h6'>Monthly Target</Typography>}
                />
                <ElementWithLoadingState isLoading={isLoading} width={65} height={32}
                    element={<Typography color="success.main" variant='h6'>{year}</Typography>}
                />
            </Box>
            <Box className="flex-row-center-between">
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