import { P } from '@abdulrhmangoni/am-store-library';
import { Delete } from '@mui/icons-material';
import { CircularProgress, IconButton, Paper } from '@mui/material';
import { useState } from 'react';
import useDiscountsCobonesActions from '../../hooks/useDiscountsCobonesActions';
import useNotifications from '../../hooks/useNotifications';
import useDiscountCobones, { CoboneType } from '../../hooks/useDiscountCobones';

interface CoboneCardProps {
    cobone: CoboneType
}

export default function CoboneCard({ cobone }: CoboneCardProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const { deleteDiscountCobone } = useDiscountsCobonesActions();
    const { message } = useNotifications();
    const { deleteCobone } = useDiscountCobones();

    function deleteTheCobone(coboneId: string) {
        setLoading(true);
        deleteDiscountCobone(coboneId)
            .then(() => {
                message("The cobone deleted successfully", "success");
                deleteCobone(coboneId);
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Unexpected error happened";
                message(errorMessage, "error")
            })
            .finally(() => setLoading(false))
    }

    return (
        <Paper
            sx={{ px: 1.5, py: 1 }}
            className="flex-row-center-start full-width gap1"
        >
            <P sx={{ width: "140px" }}>{cobone.name}</P>
            <P sx={{ flex: 1, color: "primary.main" }}>{cobone.value * 100}%</P>
            <IconButton
                size="small"
                onClick={() => deleteTheCobone(cobone.id)}
            >
                {loading ? <CircularProgress size={20} /> : <Delete color="error" fontSize="small" />}
            </IconButton>
        </Paper>
    )
}
