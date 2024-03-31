import { Settings } from "@mui/icons-material";
import PageTitle from "../components/PageTitle";
import { Container, Divider } from "@mui/material";

export default function SettingsPage() {
    return (
        <Container maxWidth="md" sx={{ px: 1 }}>
            <PageTitle
                title="Settings"
                description="Manage the settings, configurations and role of the store"
                icon={<Settings />}
            />
            <Divider sx={{ my: 3 }} />
        </Container>
    )
}
