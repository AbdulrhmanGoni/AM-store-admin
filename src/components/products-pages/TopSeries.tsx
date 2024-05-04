import { JSX } from 'react'
import { FetchFailedAlert, nDecorator, P } from '@abdulrhmangoni/am-store-library'
import { Alert, Box, Chip, Divider, List, ListItem, ListItemText, Paper, Skeleton } from '@mui/material'
import { SeriesType, TopSeriesType } from '../../hooks/useTopSeries'
import useTopSeries from '../../hooks/useTopSeries'

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

    const { data, isFetching: isLoading, isError, refetch } = useTopSeries();

    const topSeries = data?.[sortType as keyof TopSeriesType]

    return (
        <Paper sx={{ height: "200px" }}>
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
                        Array.from(Array(5)).map((_, i: number) => <Skeleton key={i} variant="rounded" width="100%" height={32} />)
                        : isError ?
                            <FetchFailedAlert message='Failed to fetch the top series' refetch={refetch} />
                            : topSeries?.length ?
                                topSeries.map(({ series, value }: SeriesType, index: number) => {
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
                                : topSeries && !isError &&
                                <Alert severity="info" className='flex-row-center' style={{ flex: 1 }}>No Series</Alert>
                }
            </List>
        </Paper>
    )
}


