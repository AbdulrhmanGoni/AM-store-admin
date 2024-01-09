import calculatePercentage from '../functions/calculatePercentage'
import { LinearProgress, CircularProgress, Box, SxProps } from '@mui/material'
import { Close, Done, NorthEast, Report } from '@mui/icons-material';
import { nDecorator, P } from '@abdulrhmangoni/am-store-library';

interface TargetProgressProps {
    target: number,
    value: number,
    timeouted: boolean,
    noTarget: boolean,
    progressLineStyle?: SxProps
}

export function TargetProgressLine({ target, value, progressLineStyle, timeouted, noTarget }: TargetProgressProps) {
    const achivedPercentage = calculatePercentage(target, value);
    const percentage = achivedPercentage ? achivedPercentage : 0;
    const isCompleted = !noTarget && percentage >= 100;

    return (
        <Box>
            <Box className="flex-row-center-between">
                <P variant='h6' fontSize="16px">
                    {timeouted ? "Month's" : "Current"} Earnings:
                    <P
                        component="span" ml={.5}
                        color={
                            isCompleted ? "success.main"
                                : percentage && timeouted ? "error.main" : "text.primary"
                        }
                    >
                        ${nDecorator(value?.toFixed(2))}
                    </P>
                </P>
                <P variant='body1' className='flex-row-center' color="success.main">
                    {
                        percentage > 100 && !noTarget &&
                        <>
                            {(percentage - 100).toFixed(2)}%
                            <NorthEast sx={{ fontSize: "1.3rem" }} color='success' />
                        </>
                    }
                </P>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: .5 }}>
                <LinearProgress
                    sx={{ width: "100%", ...progressLineStyle }}
                    variant="determinate"
                    value={noTarget ? 0 : isCompleted ? 100 : percentage}
                    color={
                        noTarget ? "warning"
                            : isCompleted ? "success"
                                : percentage && timeouted ? "error" : "primary"
                    }
                />
                {
                    noTarget ? <Report color="warning" />
                        : isCompleted ? <Done color="success" />
                            : percentage && timeouted ? <Close color="error" />
                                : <P>{percentage}%</P>
                }
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
                <P
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >
                    {`${percentage}%`}
                </P>
            </Box>
        </Box>
    );
}