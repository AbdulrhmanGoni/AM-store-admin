"use client"
import { Box, Grid } from '@mui/material'
import PageTitle from '../components/PageTitle';
import { Groups } from '@mui/icons-material';
import UsersOverview from '../components/users-page/UsersOverviewTable';
import pageSpaces from '../CONSTANTS/pageSpaces';
import DisplayInfoBox from '../components/DisplayInfoBox';
import randomColorsArr from '../CONSTANTS/randomColorsArr';


export default function UsersPage() {

    return (
        <Box className="flex-column" gap={pageSpaces}>
            <PageTitle
                title='Users Management'
                description='View users information and statistics'
                icon={<Groups />}
            />
            <Box sx={{ display: "flex", gap: pageSpaces, width: "100%" }}>
                <DisplayInfoBox
                    title='Users Count'
                    icon={<Groups />}
                    body={9}
                    iconColor={randomColorsArr[0]}
                    type="horizontally"
                    BoxStyle={{ width: "100%" }}
                />
                <DisplayInfoBox
                    title='Verified Users'
                    icon={<Groups />}
                    body={7}
                    iconColor={randomColorsArr[1]}
                    type="horizontally"
                    BoxStyle={{ width: "100%" }}
                />
                <DisplayInfoBox
                    title='Customers'
                    icon={<Groups />}
                    body={7}
                    iconColor={randomColorsArr[2]}
                    type="horizontally"
                    BoxStyle={{ width: "100%" }}
                />
                <DisplayInfoBox
                    title='Unverified Users'
                    icon={<Groups />}
                    body={2}
                    iconColor={randomColorsArr[3]}
                    type="horizontally"
                    BoxStyle={{ width: "100%" }}
                />
            </Box>
            <Grid container spacing={pageSpaces}>
                <Grid item xs={12}>
                    <UsersOverview />
                </Grid>
            </Grid>
        </Box>
    )
}