import { Alert, Box, Button, Collapse, Container, Divider, IconButton, Paper } from "@mui/material";
import PageTitle from "../components/PageTitle";
import { Add, Discount, Refresh } from "@mui/icons-material";
import { P } from "@abdulrhmangoni/am-store-library";
import { useState } from "react";
import AddCoboneForm from "../components/cobones-and-discounts/AddCoboneForm";
import CoboneCard from "../components/cobones-and-discounts/CoboneCard";
import CoboneCardsLoading from "../components/cobones-and-discounts/CoboneCardsLoading";
import useDiscountCobones from "../hooks/useDiscountCobones";


export default function DiscountsCobonsPage() {

    const { cobones, isLoading, isError, refetch } = useDiscountCobones();
    const [openAddCoboneField, setOpenAddCoboneField] = useState<boolean>(false);

    function toggleAddCoboneField() {
        if (openAddCoboneField) setOpenAddCoboneField(false)
        else setOpenAddCoboneField(true)
    }

    return (
        <Container maxWidth="md" sx={{ px: 1 }}>
            <PageTitle
                title="Cobones & Discounts"
                icon={<Discount />}
                description="Discount cobones management, View and manage the products that has discount"
            />
            <Divider sx={{ my: 3 }} />
            <Button
                variant="contained"
                onClick={toggleAddCoboneField}
                sx={{ mx: "auto" }}
                startIcon={
                    <Add
                        sx={{
                            transition: ".3s",
                            transform: openAddCoboneField ? "rotate(-45deg)" : "rotate(0deg)"
                        }}
                    />
                }
            >
                Add Cobone
            </Button>
            <Collapse in={openAddCoboneField} sx={{ mt: 1 }}>
                <AddCoboneForm />
            </Collapse>
            <Box className="flex-column gap1" sx={{ my: 4 }}>
                <Paper
                    sx={{ p: 1.5, bgcolor: "primary.main", color: "white" }}
                    className="flex-row-center-start full-width gap1"
                >
                    <P sx={{ width: "140px" }}>Name</P>
                    <P sx={{ flex: 1 }}>Discount</P>
                    <P sx={{ width: "35px" }}></P>
                </Paper>
                {
                    isLoading ? <CoboneCardsLoading />
                        : isError ? (
                            <Alert
                                severity="error"
                                icon={
                                    <IconButton onClick={() => refetch()}>
                                        <Refresh />
                                    </IconButton>
                                }
                            >
                                Failed to bring discount cobones
                            </Alert>
                        )
                            : cobones ?
                                cobones.length ?
                                    cobones.map((cobone) => <CoboneCard key={cobone.id} cobone={cobone} />)
                                    : <Alert severity="info">No Discount Copones</Alert>
                                : null
                }
            </Box>
        </Container>
    )
}
