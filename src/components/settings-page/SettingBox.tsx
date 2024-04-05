import { Typography, Paper } from "@mui/material";
import pageSpaces from "../../CONSTANTS/pageSpaces";
import { ReactNode } from "react";

interface SettingBoxProps {
    title: string,
    description: string,
    actionsSection?: ReactNode
    children?: ReactNode
}

export default function SettingBox({ title, description, actionsSection, children }: SettingBoxProps) {
    return (
        <Paper sx={{ p: pageSpaces, height: "100%", position: "relative" }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                {title}
            </Typography>
            {children}
            <Typography variant="body2" my={1}>
                {description}
            </Typography>
            {actionsSection}
        </Paper>
    )
}
