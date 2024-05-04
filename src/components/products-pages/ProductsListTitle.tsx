import { P } from "@abdulrhmangoni/am-store-library";
import SmallIconBox from "../SmallIconBox";
import { Box } from "@mui/material";

type ListTitleProps = {
    title: string,
    subTitle: string,
    color?: string
    icon: JSX.Element | string | number
}

export default function ProductsListTitle({ title, subTitle, color, icon }: ListTitleProps) {
    return (
        <Box sx={{ width: "100%", p: "0px 10px 10px" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 1 }}>
                <P variant="h6">{title}</P>
                <SmallIconBox
                    icon={icon}
                    color={color}
                    svgIconSize={20}
                    boxStyle={{ p: "2px" }}
                />
            </Box>
            <P variant="body2">{subTitle}</P>
        </Box >
    )
}
