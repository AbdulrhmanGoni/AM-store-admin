import { Refresh } from '@mui/icons-material';
import { IconButton, Alert } from '@mui/material';

interface ErrorUsersTableProps {
    itemsCount?: number,
    refetch?: () => void,
    isError: boolean
}
export default function ErrorUsersTable({ isError, refetch }: ErrorUsersTableProps) {
    return (
        <Alert
            severity={isError ? "error" : "info"}
            className='flex-row-center'
            sx={{
                width: "100%",
                "& .MuiAlert-action": { ml: 0, pl: 1 },
                flex: 1
            }}
            action={
                isError &&
                <IconButton
                    onClick={refetch}
                >
                    <Refresh />
                </IconButton>
            }
        >
            {isError ? "Failed to fetch your payment methods" : "There is no users"}
        </Alert>
    )
}
