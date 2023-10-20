import * as React from 'react';
import calculatePercentage from '@/functions/calculatePercentage'
import { LinearProgress, CircularProgress, Typography, Box, SxProps } from '@mui/material'
import { Done, NorthEast } from '@mui/icons-material';
import { nDecorator } from '@abdulrhmangoni/am-store-library';


interface TargetProgressProps {
    target: number,
    value: number,
    progressStyle?: SxProps
}

export function TargetProgressLine({ target, value, progressStyle }: TargetProgressProps) {
    const achivedPercentage = calculatePercentage(target, value)
    const percentage = achivedPercentage ? achivedPercentage : 0
    const isCompleted = percentage >= 100
    return (
        <Box>
            <Box className="flex-row-center-between">
                <Typography variant='h6' fontSize="16px">
                    Current Earnings: ${nDecorator(value?.toFixed(2))}
                </Typography>
                <Typography variant='body1' className='flex-row-center' color="success.main">
                    {
                        percentage > 100 &&
                        <>
                            {(percentage - 100).toFixed(2)}%
                            <NorthEast sx={{ fontSize: "1.3rem" }} color='success' />
                        </>
                    }
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: .5 }}>
                <LinearProgress
                    sx={{ width: "100%", ...progressStyle }}
                    variant="determinate"
                    value={isCompleted ? 100 : percentage}
                    color={isCompleted ? "success" : "primary"}
                />
                {isCompleted ? <Done color="success" /> : <Typography>{percentage}%</Typography>}
            </Box>
        </Box>
    )
}

export function TargetProgressCircular({ target, value }: TargetProgressProps) {
    const percentage = calculatePercentage(target, value);
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={percentage} />
            <Box
                sx={{
                    top: 0, left: 0,
                    bottom: 0, right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >
                    {`${percentage}%`}
                </Typography>
            </Box>
        </Box>
    );
}