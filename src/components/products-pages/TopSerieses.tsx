import { JSX } from 'react'
import { PromiseState, nDecorator } from '@abdulrhmangoni/am-store-library'
import { Box, Chip, Divider, List, ListItem, ListItemText, Skeleton, Typography } from '@mui/material'

type TopSeriesesData = {
    series: string,
    value: number
}

interface TopSeriesesProps extends PromiseState {
    data: TopSeriesesData[],
    title: string,
    icon: JSX.Element,
    isMoney?: boolean
}

export default function TopSerieses({ data, isLoading, title, icon, isMoney }: TopSeriesesProps) {
    const
        rankingColors = ["#AF9500", "#c0c0c0", "#6A3805"],
        dataArray = data ?? [{}, {}, {}, {}, {}],
        money = isMoney ? "$" : ""

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {icon}
                <Typography variant="h6" >{title}</Typography>
            </Box>
            <Divider sx={{ width: "100%", mt: 1 }} />
            <List
                className="flex-column"
                sx={{
                    overflow: "auto",
                    height: "calc(100% - 32px)",
                    gap: isLoading ? 1 : .5
                }}>
                {
                    dataArray.map(({ series, value }: TopSeriesesData, index: number) => {
                        return isLoading ?
                            <Skeleton key={index} variant="rounded" width="100%" height={32} />
                            :
                            <ListItem
                                sx={{ pr: "6px" }}
                                key={series}
                                disablePadding
                            >
                                <ListItemText primary={series} />
                                <Chip
                                    size='small'
                                    variant="outlined"
                                    sx={{ bgcolor: rankingColors[index], borderRadius: 1 }}
                                    label={money + nDecorator(value.toFixed(isMoney ? 2 : 0))}
                                />
                            </ListItem>
                    })
                }
            </List>
        </>
    )
}


