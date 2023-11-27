import { JSX } from 'react'
import { nDecorator } from '@abdulrhmangoni/am-store-library'
import { Box, Chip, Divider, List, ListItem, ListItemText, Paper, Skeleton, Typography } from '@mui/material'
import { SeriesType, TopSeriesesType } from '../../hooks/useTopSerieses'
import useTopSerieses from '../../hooks/useTopSerieses'


interface TopSeriesesProps {
    sortType: "topSold" | "topEarnings",
    title: string,
    icon: JSX.Element,
    isMoney?: boolean
}

export default function TopSerieses({ title, icon, isMoney, sortType }: TopSeriesesProps) {
    const
        rankingColors = ["#AF9500", "#c0c0c0", "#6A3805"],
        money = isMoney ? "$" : ""

    const { data, isLoading } = useTopSerieses();

    return (
        <Paper>
            <Box className="flex-column" p={1}>
                <Box className="flex-row gap1">
                    {icon}
                    <Typography variant="h6" >{title}</Typography>
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
                        : data?.[sortType as keyof TopSeriesesType]?.map(({ series, value }: SeriesType, index: number) => {
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
                }
            </List>
        </Paper>
    )
}


