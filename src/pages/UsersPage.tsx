"use client"
import { Box, Grid } from '@mui/material'
import PageTitle from '../components/PageTitle';
import { Groups } from '@mui/icons-material';
import UsersOverview from '../components/users-page/UsersOverviewTable';
import TopUsers from '../components/users-page/TopUsers';
import pageSpaces from '../CONSTANTS/pageSpaces';
import DisplayInfoBox from '../components/DisplayInfoBox';
import randomColorsArr from '../CONSTANTS/randomColorsArr';
import useBreakPoints from '../hooks/useBreakPoints';
import useUsersPageContent from '../hooks/useUsersPageContent';


export default function UsersPage() {

    const {
        usersStatistics: {
            usersCount,
            customersCount,
            verifiedUsers
        },
        isLoading,
        isError
    } = useUsersPageContent()
    const { largeScreen } = useBreakPoints("up");
    const infoBoxStyle = { height: "100%", p: 1.5 };
    const infoBoxType = largeScreen ? "horizontally" : "columnly";

    return (
        <Box className="flex-column" gap={pageSpaces}>
            <PageTitle
                title='Users Management'
                description='View users information and statistics'
                icon={<Groups />}
            />
            <Grid container spacing={pageSpaces}>
                <Grid item xs={6} sm={3}>
                    <DisplayInfoBox
                        isLoading={isLoading}
                        isError={isError}
                        title='Users Count'
                        icon={<Groups />}
                        body={usersCount}
                        iconColor={randomColorsArr[0]}
                        type={infoBoxType}
                        BoxStyle={infoBoxStyle}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <DisplayInfoBox
                        title='Customers'
                        icon={<img src='/icons/customers.svg' />}
                        body={customersCount}
                        iconColor={randomColorsArr[1]}
                        type={infoBoxType}
                        BoxStyle={infoBoxStyle}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <DisplayInfoBox
                        title='Verified Users'
                        icon={<img src='/icons/users-group-verification.svg' />}
                        body={verifiedUsers}
                        iconColor={randomColorsArr[2]}
                        type={infoBoxType}
                        BoxStyle={infoBoxStyle}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <DisplayInfoBox
                        title='Unverified Users'
                        icon={<img src='/icons/usersWarning.svg' />}
                        body={usersCount - verifiedUsers}
                        iconColor={randomColorsArr[3]}
                        type={infoBoxType}
                        BoxStyle={infoBoxStyle}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={pageSpaces}>
                <Grid item xs={12} lg={6}>
                    <UsersOverview />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TopUsers />
                </Grid>
            </Grid>
        </Box>
    )
}