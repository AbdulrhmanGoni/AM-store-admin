"use client"
import { Box, Grid, Paper } from '@mui/material'
import { pageSpaces } from '../page';
import PageTitle from '@/components/PageTitle';
import { Groups } from '@mui/icons-material';
import UsersOverview from './components/UsersOverview';


export default function UsersPage() {

    return (
        <Box className="flex-column" gap={pageSpaces}>
            <PageTitle
                title='Users Management'
                description='View users information and statistics'
                icon={<Groups />}
            />
            <Grid container spacing={pageSpaces}>
                <Grid item xs={12} md={6}>
                    <UsersOverview />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", gap: pageSpaces, width: "100%" }}>
                        <Paper sx={{ width: "100%", height: "300px" }}>

                        </Paper>
                        <Paper sx={{ width: "100%", height: "300px" }}>

                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}