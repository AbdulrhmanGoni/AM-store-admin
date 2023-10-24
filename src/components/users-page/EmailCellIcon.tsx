import { ErrorOutline, VerifiedOutlined } from "@mui/icons-material"
import { SvgIconOwnProps, Tooltip } from "@mui/material"


export default function EmailCellIcon({ isVerified }: { isVerified: boolean }) {

    const verifiedMessage = "This email is verified"
    const unVerifiedMessage = "This email not verified yet"
    const iconProps: SvgIconOwnProps = {
        sx: { transform: "translate(0px, 5px)", mr: 0.5, width: ".8em", height: ".8em" },
        color: isVerified ? 'success' : "warning"
    }

    return (
        <Tooltip title={isVerified ? verifiedMessage : unVerifiedMessage}>
            {isVerified ? <VerifiedOutlined {...iconProps} /> : <ErrorOutline {...iconProps} />}
        </Tooltip>
    )
}

