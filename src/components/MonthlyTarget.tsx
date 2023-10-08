import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { TargetProgressLine } from './TargetProgress'
import { nDecorator } from '@abdulrhmangoni/am-store-library'
import moment, { monthsShort } from 'moment'
import SelectBox from '@/components/SelectBox'

interface MonthlyTargetProps {
    title: string,
    target: number,
    value: number
}

export default function MonthlyTarget({ target, title, value }: MonthlyTargetProps) {
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", gap: 1, p: 2, height: "100%" }}>
            <Typography variant='h6'>{title}</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography color="success.main" variant='h5'>${nDecorator(target)}</Typography>
                <SelectBox values={monthsShort()} defaultValue={moment().format("MMM")} />
            </Box>
            <Box>
                <Typography variant='subtitle1'>Current month earnings: ${nDecorator(value.toFixed(2))}</Typography>
                <TargetProgressLine progressStyle={{ height: 15, borderRadius: 1 }} target={target} value={value} />
            </Box>
        </Paper>
    )
}
