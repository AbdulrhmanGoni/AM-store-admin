import { Box, Button, LinearProgress } from '@mui/material'

interface SettingActionsButtonsProps {
    open?: boolean,
    cancelAction: () => void,
    saveAction: () => void,
    isLoading?: boolean
}

export default function SettingActionsButtons({ open, cancelAction, saveAction, isLoading }: SettingActionsButtonsProps) {
    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            {
                open &&
                <>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={cancelAction}
                        color="error"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        variant="contained"
                        size="small"
                        onClick={saveAction}
                    >
                        Save
                    </Button>
                    {isLoading && <LinearProgress sx={{ position: "absolute", bottom: 0, left: 0, width: "100%" }} />}
                </>
            }
        </Box>
    )
}
