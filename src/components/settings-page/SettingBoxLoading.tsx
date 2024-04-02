import { Paper, Skeleton } from '@mui/material'
import pageSpaces from '../../CONSTANTS/pageSpaces'

export default function SettingBoxLoading() {
    return (
        <Paper sx={{ p: pageSpaces, height: "100%" }}>
            <Skeleton variant='rounded' sx={{ width: "80%", height: "28px" }} />
            <Skeleton variant='rounded' sx={{ width: "100%", height: "40px", my: 1 }} />
            <Skeleton variant='rounded' sx={{ width: "100%", height: "40px" }} />
        </Paper>
    )
}
