import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { SearchFieldProps, searchResponse } from './SearchField';
import { List, Typography } from '@mui/material';

interface SearchResultRendererProps extends SearchFieldProps {
    products: searchResponse[],
    searchText: string,
    actionWithProductId: (id: string) => void
}

export default function SearchResultRenderer(props: SearchResultRendererProps) {

    const { products, searchText, actionWithProductId, endItemIcon } = props

    const mark = (text?: string) => (
        <Box
            component="mark"
            sx={{ bgcolor: "primary.main", color: "text.primary" }}
        >
            {text ?? ""}
        </Box>
    )

    const listHeight = products.length > 6 ? 240 : products.length ? products.length * 40 : 40;

    return (
        <Box
            sx={{
                width: '100%', height: listHeight,
                bgcolor: 'background.paper',
                position: "absolute",
                left: 0, top: "100%", zIndex: 100
            }}
        >
            <List disablePadding sx={{
                width: "100%",
                height: listHeight,
                overflow: "auto"
            }}>
                {
                    !!products.length ?
                        products.map(({ _id, title }) => {
                            let regExp = new RegExp(searchText.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "ig");
                            const
                                matched = title.match(regExp),
                                splitedText = title.split(regExp);

                            return (
                                <ListItem key={_id} component="div" disablePadding>
                                    <ListItemButton onClick={() => actionWithProductId(_id)} sx={{ justifyContent: "space-between" }}>
                                        <Typography component="p">
                                            {splitedText.map((str, index) =>
                                                <Typography component="span" key={str + index}>
                                                    {str}{index !== splitedText.length - 1 && mark(matched?.[index])}
                                                </Typography>
                                            )}
                                        </Typography>
                                        {endItemIcon}
                                    </ListItemButton>
                                </ListItem>
                            )
                        }) :
                        <ListItem key="No Search" component="div" disablePadding>
                            <ListItemButton>
                                <Typography component="p">No Search Result</Typography>
                            </ListItemButton>
                        </ListItem>
                }
            </List>
        </Box>
    );
}