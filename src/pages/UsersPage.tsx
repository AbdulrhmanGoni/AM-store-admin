"use client"
import { Box, Grid, useMediaQuery } from '@mui/material'
import PageTitle from '../components/PageTitle';
import { Groups } from '@mui/icons-material';
import UsersOverview from '../components/users-page/UsersOverviewTable';
import pageSpaces from '../CONSTANTS/pageSpaces';
import DisplayInfoBox from '../components/DisplayInfoBox';


export default function UsersPage() {

    const mediumNinSize = useMediaQuery("(min-width: 900px)")
    const mediumMaxSize = useMediaQuery("(max-width: 1200px)")

    const displayInfoBoxType = mediumNinSize && mediumMaxSize ? "columnly" : "horizontally"

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
                        <DisplayInfoBox
                            title='Users Count'
                            icon={<Groups />}
                            body={9}
                            type={displayInfoBoxType}
                            BoxStyle={{ width: "100%" }}
                        />
                        <DisplayInfoBox
                            title='Users Count'
                            icon={<Groups />}
                            body={7}
                            type={displayInfoBoxType}
                            BoxStyle={{ width: "100%" }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}