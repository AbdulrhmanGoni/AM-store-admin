import { AddBox } from "@mui/icons-material";
import { Button, Card, IconButton, TextField } from "@mui/material";
import pageSpaces from "../../CONSTANTS/pageSpaces";
import useAddCategoryFormLogic from "../../hooks/useAddCategoryFormLogic";
import LoadingLine from "../LoadingLine";

export default function AddCategoryForm() {

    const {
        handleFormSubmit,
        isLoading,
        error,
        openFiled,
        setOpenField
    } = useAddCategoryFormLogic()

    return (
        <Card
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
                height: "100%",
                p: pageSpaces,
                display: "flex",
                position: "relative"
            }}
        >
            {
                openFiled &&
                <TextField
                    size="small"
                    label="Category Name"
                    name="category"
                    sx={{ mr: 1, flex: 1, "& .MuiFormHelperText-root": { mx: 0 } }}
                    disabled={isLoading}
                    error={error.isError}
                    helperText={error.isError && error.message}
                />
            }
            {
                openFiled ?
                    <IconButton
                        sx={{
                            bgcolor: "primary.main",
                            "&:hover": { bgcolor: "primary.dark" },
                            height: "fit-content"
                        }}
                        disabled={isLoading}
                        type="submit"
                    >
                        <AddBox />
                    </IconButton>
                    : <Button
                        endIcon={<AddBox />}
                        variant="contained"
                        size="small"
                        onClick={() => setOpenField(true)}
                        sx={{ height: "100%", width: "100%" }}
                    >
                        Add Category
                    </Button>
            }
            <LoadingLine isLoading={isLoading} place="bottom" />
        </Card>
    )
}
