import { JSX } from 'react'
import { nDecorator, P } from '@abdulrhmangoni/am-store-library'
import { Alert, Box, Chip, Divider, List, ListItem, ListItemText, Paper, Skeleton, IconButton } from '@mui/material'
import { SeriesType, TopSeriesType } from '../../hooks/useTopSeries'
import useTopSeries from '../../hooks/useTopSeries'
import { Refresh } from '@mui/icons-material'


interface TopSeriesProps {
    sortType: "topSold" | "topEarnings",
    title: string,
    icon: JSX.Element,
    isMoney?: boolean
}

export default function TopSeries({ title, icon, isMoney, sortType }: TopSeriesProps) {

    const
        rankingColors = ["#AF9500", "#c0c0c0", "#6A3805"],
        money = isMoney ? "$" : ""

    const { data, isLoading, isError, refetch } = useTopSeries();

    return (
        <Paper>
            <Box className="flex-column" p={1}>
                <Box className="flex-row gap1">
                    {icon}
                    <P variant="h6" >{title}</P>
                </Box>
                <Divider sx={{ width: "100%", mt: 1 }} />
            </Box>
            <List
                className="flex-column"
                disablePadding
                sx={{
                    overflow: "auto",
                    height: "calc(100% - 32px)",
                    gap: isLoading ? 1 : .5,
                    padding: .5
                }}>
                {
                    isLoading ?
                        Array.from(Array(5)).map((_, index: number) => {
                            return <Skeleton key={index} variant="rounded" width="100%" height={32} />
                        })
                        : data ?
                            data[sortType as keyof TopSeriesType]?.map(({ series, value }: SeriesType, index: number) => {
                                return (
                                    <ListItem
                                        sx={{ pr: "6px", bgcolor: "background.default" }}
                                        key={series}
                                    >
                                        <ListItemText primary={series} />
                                        <Chip
                                            size='small'
                                            variant="outlined"
                                            sx={{ bgcolor: rankingColors[index], borderRadius: 1 }}
                                            label={money + nDecorator(value.toFixed(isMoney ? 2 : 0))}
                                        />
                                    </ListItem>
                                )
                            })
                            : isError ?
                                <Alert
                                    severity="error"
                                    action={
                                        <IconButton onClick={() => { refetch() }}>
                                            <Refresh />
                                        </IconButton>
                                    }
                                >
                                    Failed to fetch series statistics
                                </Alert>
                                : null
                }
            </List>
        </Paper>
    )
}


