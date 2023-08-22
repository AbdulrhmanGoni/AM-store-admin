import { Box, CircularProgress, IconButton, TextField } from '@mui/material'
import SearchResultRenderer from "./SearchResultRenderer"
import { useState, useEffect } from 'react';
import useAsyncActions from '../hooks/useAsyncActions';
import { Close } from '@mui/icons-material';

export type searchResponse = { _id: string, title: string }

export default function SearchField() {

    const { searchForProducts } = useAsyncActions()

    const [searchInput, setSearchInput] = useState<string>("");
    const [keySearch, setKeySearch] = useState<string>("");
    const [products, setProducts] = useState<searchResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    function getProducts() {
        setIsLoading(true);
        searchForProducts(`${searchInput}&returnType=title`)
            .then((data) => { setProducts(data) })
            .finally(() => { setIsLoading(false) })
            .catch(() => { setIsError(false) })
    }

    function clearSearchField(): void {
        setSearchInput("")
        setKeySearch("")
        setProducts([])
        // let searchProductsField: HTMLInputElement | null = document.querySelector(".searchProductsField")
    }

    function filterProducts(productsList: searchResponse[]): searchResponse[] {
        return productsList.filter(product => product.title.match(new RegExp(searchInput, "i")))
    }

    useEffect(() => {
        if (searchInput.length === 1) {
            if (keySearch !== searchInput) {
                setKeySearch(searchInput);
                getProducts();
            }
        }
    }, [searchInput])

    const rightIconStyle = { position: "absolute", right: 12, top: "32%" }

    return (
        <Box sx={{ display: "flex", gap: 1, position: "relative", width: "100%" }}>
            <TextField
                onChange={({ target }) => { setSearchInput(target.value) }}
                fullWidth label="Search for product"
                id='searchProductsField'
                value={searchInput}
            />
            {
                isLoading ?
                    <CircularProgress size={20} sx={rightIconStyle} />
                    : !!searchInput ?
                        <IconButton sx={{ position: "absolute", right: 5, top: "13%" }} onClick={clearSearchField}><Close /></IconButton> : null
            }
            {(!!products.length && !!searchInput) && <SearchResultRenderer products={filterProducts(products)} searchText={searchInput} />}
        </Box>
    )
}
