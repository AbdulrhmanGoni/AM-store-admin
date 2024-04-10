import { BarChart, LocalShipping, ManageAccounts, Settings } from "@mui/icons-material";
import PageTitle from "../components/PageTitle";
import { Container, Divider, Grid } from "@mui/material";
import pageSpaces from "../CONSTANTS/pageSpaces";
import DefaultMonthlyTargetSetting from "../components/settings-page/DefaultMonthlyTargetSetting";
import ChangingUsersPasswordsSetting from "../components/settings-page/ChangingUsersPasswordsSetting";
import DeliveryPriceSetting from "../components/settings-page/DeliveryPriceSetting";
import FreeDeliveryEntitlementSetting from "../components/settings-page/FreeDeliveryEntitlementSetting";
import SettingsSectionTitle from "../components/settings-page/SettingsSectionTitle";
import SetMonthlyTargetsSetting from "../components/settings-page/SetMonthlyTargetsSetting";

export default function SettingsPage() {

    return (
        <Container maxWidth="md" sx={{ px: 1 }}>
            <PageTitle
                title="Settings"
                description="Manage the settings, configurations and role of the store"
                icon={<Settings />}
            />
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={pageSpaces}>
                <Grid xs={12} item>
                    <SettingsSectionTitle
                        title="Statistics"
                        icon={<BarChart />}
                    />
                </Grid>
                <Grid xs={12} md={6} item><DefaultMonthlyTargetSetting /></Grid>
                <Grid xs={12} md={6} item><SetMonthlyTargetsSetting /></Grid>
                <Grid xs={12} item>
                    <SettingsSectionTitle
                        title="Delivery"
                        icon={<LocalShipping />}
                    />
                </Grid>
                <Grid xs={12} sm={6} item><DeliveryPriceSetting /></Grid>
                <Grid xs={12} sm={6} item><FreeDeliveryEntitlementSetting /></Grid>
                <Grid xs={12} item>
                    <SettingsSectionTitle
                        title="Users"
                        icon={<ManageAccounts />}
                    />
                </Grid>
                <Grid xs={12} md={6} item><ChangingUsersPasswordsSetting /></Grid>
            </Grid>
        </Container>
    )
}
