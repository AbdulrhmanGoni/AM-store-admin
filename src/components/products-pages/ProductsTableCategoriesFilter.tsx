import { OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Checkbox, Skeleton } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useSettings from '../../hooks/useSettings';
import { useContext } from 'react';
import { ProductsCategoriesFilterContext } from './ProductsCategoriesFilterProvider';

const itemHeight = 48;
const itemPaddingTop = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: itemHeight * 4.5 + itemPaddingTop,
            width: 250
        }
    },
    MenuListProps: {
        style: {
            padding: 0
        }
    }
};

const FIELD_WIDTH = 300

export default function ProductsTableCategoriesFilter() {

    const { data, isLoading: settingsLoading } = useSettings()
    const { categories, setCategories } = useContext(ProductsCategoriesFilterContext);

    const handleChange = (event: SelectChangeEvent<typeof categories>) => {
        const { target: { value } } = event;
        setCategories(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        settingsLoading ? <Skeleton variant='rounded' sx={{ height: "40px", width: FIELD_WIDTH }} />
            : <FormControl sx={{ width: FIELD_WIDTH }}>
                <InputLabel size='small'>Categories filter</InputLabel>
                <Select
                    multiple
                    value={categories}
                    onChange={handleChange}
                    input={<OutlinedInput size='small' label="Categories filter" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {data?.productsCategories?.map((name) => (
                        <MenuItem sx={{ p: 0 }} key={name} value={name}>
                            <Checkbox checked={categories.includes(name)} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
    );
}