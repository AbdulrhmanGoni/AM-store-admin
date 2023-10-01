import LoadingGrayBar from '@/components/LoadingGrayBar'
import SmallIconBox from '@/components/SmallIconBox'
import Icon from '@/components/SvgIcon'
import { nDecorator } from '@abdulrhmangoni/am-store-library'
import { Tv } from '@mui/icons-material'
import { Box, Chip, Divider, List, ListItem, ListItemText, Typography, alpha } from '@mui/material'
import React from 'react'

type TopSeriesesProps = {
    _id: string,
    value: number
}

type DataReceiverProps = {
    data: TopSeriesesProps[] | any,
    isLoading?: boolean,
    isError?: boolean,
    isMoney?: boolean
}

export default function TopSerieses({ data, isLoading, isError, isMoney }: DataReceiverProps) {
    let
        rankingColors = ["#AF9500", "#c0c0c0", "#6A3805"],
        dataArray = data ?? [{}, {}, {}, {}, {}],
        money = isMoney ? "$" : ""

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography>Top Serieses</Typography> <Tv />
            </Box>
            <Divider sx={{ width: "100%", mt: 1 }} />
            <List
                className="flex-column"
                sx={{
                    overflow: "auto",
                    height: "calc(100% - 32px)",
                    gap: .5
                }}>
                {
                    dataArray.map(({ _id: series, value }: TopSeriesesProps, index: number) => {
                        return isLoading ?
                            <LoadingGrayBar key={index} type="rou" w={"100%"} h={32} />
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
                                    sx={{ bgcolor: rankingColors[index] }}
                                    label={money + nDecorator(value.toFixed(isMoney ? 2 : 0))}
                                />
                            </ListItem>
                    })
                }
            </List>
        </>
    )
}


