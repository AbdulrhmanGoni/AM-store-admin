import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type ProductsCategoriesFilterContextType = {
    categories: string[],
    setCategories: Dispatch<SetStateAction<string[]>>
}

export const ProductsCategoriesFilterContext = createContext<ProductsCategoriesFilterContextType>({
    categories: [],
    setCategories: () => [],
})

export default function ProductsCategoriesFilterProvider({ children }: { children: ReactNode }) {

    const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);

    return (
        <ProductsCategoriesFilterContext.Provider
            value={{
                categories: categoriesFilter,
                setCategories: setCategoriesFilter
            }}
        >
            {children}
        </ProductsCategoriesFilterContext.Provider>
    )
}
