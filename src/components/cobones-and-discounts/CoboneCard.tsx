import { P } from '@abdulrhmangoni/am-store-library';
import { Delete } from '@mui/icons-material';
import { CircularProgress, IconButton, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import useDiscountsCobonesActions from '../../hooks/useDiscountsCobonesActions';
import useNotifications from '../../hooks/useNotifications';
import useDiscountCobones, { CoboneType } from '../../hooks/useDiscountCobones';

interface CoboneCardProps {
    cobone: CoboneType
}

export default function CoboneCard({ cobone }: CoboneCardProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const [coboneCardOpacity, setCoboneCardOpacity] = useState<number>(cobone.isNew ? 0 : 1);
    const { deleteDiscountCobone } = useDiscountsCobonesActions();
    const { message } = useNotifications();
    const { deleteCobone } = useDiscountCobones();

    function deleteTheCobone(coboneId: string) {
        setLoading(true);
        deleteDiscountCobone(coboneId)
            .then(() => {
                message("The cobone deleted successfully", "success");
                setCoboneCardOpacity(0)
                setTimeout(() => { deleteCobone(coboneId); }, 200)
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Unexpected error happened";
                message(errorMessage, "error")
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        cobone.isNew && !coboneCardOpacity && setCoboneCardOpacity(1)
    }, [])

    return (
        <Paper
            sx={{ px: 1.5, py: 1, opacity: coboneCardOpacity, transition: ".25s" }}
            className="flex-row-center-start full-width gap1"
        >
            <P sx={{ width: "140px" }}>{cobone.name}</P>
            <P sx={{ flex: 1, color: "primary.main" }}>{(cobone.value * 100).toFixed(0)}%</P>
            <IconButton
                size="small"
                onClick={() => deleteTheCobone(cobone.id)}
                disabled={loading}
            >
                {loading ? <CircularProgress size={20} /> : <Delete color="error" fontSize="small" />}
            </IconButton>
        </Paper>
    )
}
