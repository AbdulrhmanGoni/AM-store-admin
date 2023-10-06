import { useState, JSX, useEffect } from 'react';
import { Box, CircularProgress, IconButton, IconButtonProps, TextField } from '@mui/material'
import SearchResultRenderer from "./SearchResultRenderer"
import { Close, Replay } from '@mui/icons-material';
import host from '@/CONSTANT/API_hostName';


export interface searchResponse { _id: string, title: string }
export interface SearchFieldProps {
    actionWithProductId: (id: string) => void,
    endItemIcon: JSX.Element,
    defaultValue?: string,
    fieldSize?: "small" | "medium",
    disableResultsList?: boolean
}

export default function SearchField({ actionWithProductId, endItemIcon, defaultValue, disableResultsList, fieldSize }: SearchFieldProps) {

    const [searchInput, setSearchInput] = useState<string>("");
    const [searchKey, setSearchKey] = useState<string>("");
    const [products, setProducts] = useState<searchResponse[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [ableResultsList, setAbleResultsList] = useState<boolean>(true);

    function clearSearchField() {
        setSearchInput("");
        setSearchKey("");
        setProducts(undefined);
    }

    function onChange(value: string) {
        value[0] !== searchKey && setSearchKey(value[0])
        !value && clearSearchField()
        setSearchInput(value)
    }

    function fetchProducts(searchKey: string) {
        setIsLoading(true);
        fetch(`${host}products?title=${searchKey}&returnType=title`)
            .then((res) => {
                if (res.status == 200) return res.json();
                else if (res.status == 404) return [];
                else return null;
            })
            .then((data) => {
                if (data) {
                    setProducts(data)
                    isError && setIsError(false);
                } else setIsError(true)
            })
            .catch(() => { setIsError(true) })
            .finally(() => { setIsLoading(false) })
    }

    function filterProducts(productsList: searchResponse[]): searchResponse[] {
        let regExp = searchInput.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
        return productsList.filter(product => product.title.match(new RegExp(regExp, "ig")))
    }

    const rightIconStyle = { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }
    const iconSize = fieldSize === "small" ? { width: "0.85em", height: "0.85em" } : {}
    const iconsProps: IconButtonProps = {
        sx: {
            display: isError || !!searchInput ? "flex" : "none",
            ...rightIconStyle,
            right: 4
        },
        size: fieldSize
    }

    useEffect(() => {
        if (!(ableResultsList && !disableResultsList)) {
            setAbleResultsList(!disableResultsList)
        }
    }, [disableResultsList])

    useEffect(() => {
        if (!disableResultsList) {
            searchKey && fetchProducts(searchKey)
        }
    }, [searchKey, disableResultsList])

    useEffect(() => {
        if (defaultValue) {
            setSearchKey(defaultValue[0])
            setSearchInput(defaultValue)
        }
    }, [defaultValue])

    return (
        <Box sx={{ display: "flex", gap: 1, position: "relative", width: "100%" }}>
            <TextField
                onChange={({ target }) => { onChange(target.value) }}
                inputProps={{ sx: { pr: "40px" } }}
                label="Search for product"
                id='searchProductsField'
                value={searchInput}
                error={isError}
                size={fieldSize}
                fullWidth
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.code === "Enter") {
                        let input = event.target as HTMLInputElement
                        console.log(input.value)
                    }
                }}
            />
            {
                isLoading ?
                    <Box sx={{ display: "flex", ...rightIconStyle }}>
                        <CircularProgress color={!isError ? "primary" : "error"} size={20} />
                    </Box>
                    : isError ?
                        <IconButton
                            onClick={() => { fetchProducts(searchKey) }}
                            {...iconsProps}
                        >
                            <Replay sx={iconSize} color="error" />
                        </IconButton>
                        : !!searchInput ?
                            <IconButton
                                onClick={() => { clearSearchField() }}
                                {...iconsProps}
                            >
                                <Close sx={iconSize} />
                            </IconButton>
                            : null
            }
            {
                (ableResultsList && products && !isLoading && !!searchInput) &&
                <SearchResultRenderer
                    actionWithProductId={actionWithProductId}
                    products={filterProducts(products)}
                    searchText={searchInput}
                    endItemIcon={endItemIcon}
                />
            }
        </Box>
    )
}