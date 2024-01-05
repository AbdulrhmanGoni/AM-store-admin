import { useState } from 'react'
import { Box, Paper } from '@mui/material'
import { TargetProgressLine } from '../TargetProgress'
import { ElementWithLoadingState, nDecorator, P, PromiseState } from '@abdulrhmangoni/am-store-library'
import SelectBox from '../SelectBox'
import SvgIcon from '../SvgIcon'
import { targetIcon } from '../targetIcon'
import { MonthSalesStatistics } from '../../hooks/useMonthlySalesStatistics'
import MONTHES from '../../CONSTANTS/MONTHES'
import isDatePassed from '../../functions/isDatePassed'

interface MonthlyTargetsProps extends PromiseState {
    currentYear: number,
    monthesData: MonthSalesStatistics[]
}

export default function MonthlyTargets({ monthesData, currentYear, isLoading }: MonthlyTargetsProps) {

    const currentMonth = new Date().getMonth();
    const [monthIndex, setMonthIndex] = useState<number>(currentMonth);
    const [loading, setLoading] = useState<boolean>(false);

    const loadingState = isLoading || loading;
    const timeouted = isDatePassed(currentYear, monthIndex);

    return (
        <Paper className='flex-column j-around gap2 full-height' sx={{ p: 2 }}>
            <Box className="flex-row-center-start gap1">
                <ElementWithLoadingState isLoading={isLoading} width={35} height={35}
                    element={<SvgIcon width={35} height={35} svgElementAsString={targetIcon} />}
                />
                <ElementWithLoadingState isLoading={isLoading} height={30} width={150}
                    element={<P flex={1} variant='h6'>Monthly Target</P>}
                />
                <ElementWithLoadingState isLoading={isLoading} width={65} height={32}
                    element={<P variant='h6'>{currentYear}</P>}
                />
            </Box>
            <Box className="flex-row-center-between">
                <ElementWithLoadingState
                    isLoading={loadingState}
                    width={75}
                    height={32}
                    element={
                        <P color="text.primary" variant='h5'>
                            ${nDecorator(monthesData?.[monthIndex].earningsTarget ?? 0)}
                        </P>
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
                                }, 300)
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
                        progressLineStyle={{ height: 15, borderRadius: 1 }}
                        target={monthesData?.[monthIndex].earningsTarget ?? 0}
                        value={monthesData?.[monthIndex].totalEarnings ?? 0}
                        timeouted={timeouted}
                    />
                }
            />
        </Paper>
    )
}