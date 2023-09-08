import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { searchResponse } from './SearchField';
import { ReadMore } from '@mui/icons-material';
import { Typography } from '@mui/material';
import useProductsDisplayer from '@/hooks/useProductsDisplayer';


export default function VirtualizedList({ products, searchText }: { products: searchResponse[], searchText: string }) {

    const { display } = useProductsDisplayer();

    const mark = (text?: string) => <Box sx={{ bgcolor: "primary.main", color: "text.primary" }} component="mark">{text ?? ""}</Box>
    function renderRow(props: ListChildComponentProps) {
        const { index, style } = props;
        let
            title = products[index].title,
            regExp = new RegExp(searchText, "ig"),
            id = products[index]._id

        const
            matched = title.match(regExp),
            splitedText = title.split(regExp);

        return (
            <ListItem style={style} key={id} component="div" disablePadding>
                <ListItemButton onClick={() => display(id)} sx={{ justifyContent: "space-between", }}>
                    <Typography component="p">
                        {
                            splitedText.map((str, index) =>
                                <Typography component="span" key={str + index}>
                                    {str}{index !== splitedText.length - 1 && mark(matched?.[index])}
                                </Typography>
                            )
                        }
                    </Typography>
                    <ReadMore />
                </ListItemButton>
            </ListItem>
        );
    }

    const itemSize = 46,
        itemsCount = products.length,
        listHeight = itemsCount > 6 ? 280 : itemsCount * itemSize;

    return (
        <Box
            sx={{
                width: '100%', height: listHeight,
                bgcolor: 'background.paper',
                position: "absolute",
                left: 0, top: "100%", zIndex: 100
            }}
        >
            <FixedSizeList
                width="100%"
                height={listHeight}
                itemSize={itemSize}
                itemCount={itemsCount}
                overscanCount={4}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}