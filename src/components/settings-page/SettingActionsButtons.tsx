import { Box, Button } from '@mui/material';
import LoadingLine from '../LoadingLine';

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
                    <LoadingLine isLoading={!!isLoading} place="bottom" />
                </>
            }
        </Box>
    )
}
