import { IllustrationCard } from '@abdulrhmangoni/am-store-library'
import { Button } from '@mui/material'

export default function Unauthorized({ action }: { action: () => void }) {
    return (
        <IllustrationCard
            title="You are not authorized"
            illustratorType="unauthorized"
            hideAlertMsg fullPage
        >
            <Button onClick={action} variant="contained">log In</Button>
        </IllustrationCard>
    )
}