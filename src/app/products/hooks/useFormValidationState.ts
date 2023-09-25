
import { useState } from "react";
import CATEGORIES from "@/CONSTANT/CATEGORIES";
import getFormData, { ProductformData } from "../functions/getFormData";

export default function useFormValidationState() {

    const [titleState, setTitleState] = useState<boolean>(true);
    const [priceState, setPriceState] = useState<boolean>(true);
    const [seriesState, setSeriesState] = useState<boolean>(true);
    const [descriptionState, setDescriptionState] = useState<boolean>(true);
    const [amountState, setAmountState] = useState<boolean>(true);
    const [categoryState, setCategoryState] = useState<boolean>(true);
    const [imageState, setImageState] = useState<boolean>(true);

    function Checker(field: string, state: boolean): boolean {
        switch (field) {
            case "title": setTitleState(state); return state;
            case "price": setPriceState(state); return state;
            case "series": setSeriesState(state); return state;
            case "category": setCategoryState(state); return state;
            case "images": setImageState(state); return state;
            case "amount": setAmountState(state); return state;
            case "description": setDescriptionState(state); return state;
            default: return false
        }
    }

    function formValidation(formData: FormData): ProductformData | false {
        const data = getFormData(formData)
        const { title, price, series, category, files, amount, description } = data;
        const
            validTitle = Checker("title", title.length > 6),
            validPrice = Checker("price", (price > 0)),
            validSeries = Checker("series", series.length > 1),
            validCategory = Checker("category", CATEGORIES.some(cat => cat === category)),
            validImage = Checker("images", !!files.length),
            validAmount = Checker("amount", amount > 0),
            validDescription = Checker("description", description.length > 10)

        if (validTitle && validPrice && validSeries && validCategory && validImage && validAmount && validDescription) {
            return data
        } else return false
    }

    return {
        titleState,
        priceState,
        seriesState,
        descriptionState,
        amountState,
        categoryState,
        imageState,
        formValidation
    }
}
