import { ExpandMore } from "@mui/icons-material";
import {
    Accordion, AccordionDetails, AccordionSummary,
    Avatar, Box, Button, Chip, ListItem,
    SxProps,
    Typography, capitalize
} from "@mui/material";

export default function CustomListItem(props: {
    id?: string,
    title: string,
    subTitle?: string,
    avatar?: string,
    avatarSx?: SxProps,
    descriptionBox?: JSX.Element,
    onRightElement?: JSX.Element,
    actionButton?: {
        onClick: () => void;
        label: string
    }
    note?: string
}) {

    const { title, avatar, id, subTitle, descriptionBox, onRightElement, actionButton, note } = props;

    return (
        <ListItem sx={{ p: 0, borderRadius: 1 }} >
            <Accordion
                sx={{ 
                    bgcolor: "background.default", 
                    width: "100%",
                    backgroundImage: "none"
                }}
                
            >
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    id={id}
                    sx={{
                        gap: 1, p: "0px 8px",
                        "& .css-o4b71y-MuiAccordionSummary-content": { 
                            alignItems: "center", 
                            m: "8px 0px" 
                        }
                    }}
                >
                    <Avatar src={avatar} sx={{ width: 40, height: 40, mr: 1, ...props.avatarSx }}>
                        {title[0]}
                    </Avatar>
                    <Box>
                        <Typography variant='subtitle1'>
                            {title}
                            {note && <Chip size="small" sx={{ fontSize: "12px", ml: 1 }} label={note} />}
                        </Typography>
                        <Typography variant='body2'>{subTitle}</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        {onRightElement}
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    {descriptionBox}
                    {
                        actionButton &&
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                            <Button
                                onClick={actionButton?.onClick}
                                variant="contained"
                                size="small">{actionButton?.label}</Button>
                        </Box>
                    }
                </AccordionDetails>
            </Accordion>
        </ListItem>
    )
}

interface DisplyProductDetailsProps {
    price: number | string, 
    category: string, 
    description: string
}
export const DisplyProductDetails = ({ price, category, description }: DisplyProductDetailsProps) => {
    return (
        <Box>
            <Typography sx={{ display: "inline", mr: 1 }} variant='subtitle1'>
                ${price}
            </Typography>
            <Typography sx={{ display: "inline" }} variant='subtitle1'>
                {capitalize(category)}
            </Typography>
            <Typography variant='body1'>
                {description}
            </Typography>
        </Box>
    )
}