import * as React from 'react';
import calculatePercentage from '@/functions/calculatePercentage'
import { LinearProgress, CircularProgress, Typography, Box, SxProps } from '@mui/material'

interface TargetProgressProps {
    target: number,
    value: number,
    progressStyle?: SxProps
}

export function TargetProgressLine({ target, value, progressStyle }: TargetProgressProps) {
    const percentage = calculatePercentage(target, value);
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
            <LinearProgress
                sx={{ width: "100%", ...progressStyle }}
                variant="determinate"
                value={percentage}
            />
            <Typography>{percentage}%</Typography>
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