import { useRef, useState } from "react";
import useProductsActions from "./useProductsActions";
import useNotifications from "./useNotifications";
import { isNumber } from "@abdulrhmangoni/am-store-library";
import useSettings from "./useSettings";

export default function useAddCategoryFormLogic({ initialOpen }: { initialOpen?: boolean }) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ isError: false, message: "" });
    const [openFiled, setOpenField] = useState(!!initialOpen);
    const { createCategory } = useProductsActions();
    const { updateSettingState } = useSettings()
    const { message } = useNotifications();
    const categoryInputRef = useRef<HTMLInputElement>(null);

    function validateCategoryName(category: FormDataEntryValue | null): false | string {
        if (typeof category !== "string" || isNumber(category)) {
            setError({ isError: true, message: "Invalid Category Name" });
            return false;
        } else {
            if (category.length > 2) {
                setError({ isError: false, message: "" })
                return category
            } else {
                setError({ isError: true, message: "Name should consist of 3 letters at least" })
                return false
            }
        }
    }

    function updateCategoriesState(newCategory: string) {
        updateSettingState((currentSetting) => {
            return {
                ...currentSetting,
                productsCategories: [...currentSetting.productsCategories, newCategory]
            }
        })
    }

    function handleFormSubmit() {
        const data = categoryInputRef.current?.value;
        const category = validateCategoryName(data as string);
        if (category) {
            setIsLoading(true);
            createCategory(category)
                .then(() => {
                    updateCategoriesState(category);
                    message(`The category "${category}" successfully`, "success");
                    setOpenField(false);
                })
                .catch((error) => {
                    const errorMessage = error.response?.data?.message || `failed to add "${category}" category`;
                    message(errorMessage, "error");
                })
                .finally(() => setIsLoading(false))
        }
    }

    return {
        handleFormSubmit,
        isLoading,
        error,
        openFiled,
        setOpenField,
        categoryInputRef
    }
}
