import { FormEvent, useState } from "react";
import useProductsActions from "./useProductsActions";
import useNotifications from "./useNotifications";
import { isNumber } from "@abdulrhmangoni/am-store-library";

export default function useAddCategoryFormLogic() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ isError: false, message: "" });
    const { createCategory } = useProductsActions();
    const [openFiled, setOpenField] = useState(false);
    const { message } = useNotifications();

    function validateCategoryName(category: FormDataEntryValue | null): false | string {
        if (typeof category !== "string" || isNumber(category)) {
            setError({ isError: true, message: "Invalid Category" });
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

    function addCategory(category: string) {
        if (validateCategoryName(category)) {
            setIsLoading(true)
            createCategory(category)
                .then(() => {

                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => setIsLoading(false))
        }
    }

    function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const category = validateCategoryName(data.get("category"));
        if (category) {
            setIsLoading(true);
            createCategory(category)
                .then(() => {
                    message(`The category "${category}" successfully`);
                    setOpenField(false);
                })
                .catch((error) => {
                    console.log(error);
                    message(`failed to add "${category}" category`);
                })
                .finally(() => setIsLoading(false))
        }
    }

    return {
        addCategory,
        handleFormSubmit,
        isLoading,
        error,
        openFiled,
        setOpenField
    }
}
