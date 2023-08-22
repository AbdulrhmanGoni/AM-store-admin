import isImagePath from "@/functions/isImage";
import { useState } from "react";
import { catagoriesInfo } from "../components/AddProductForm";
import getFormData from "../functions/getFormData";
import { submetEvent } from "@/types/dataTypes";

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

    function formValidation(event: submetEvent): boolean {
        const { title, price, series, category, image, amount, description } = getFormData(event);
        const
            isValidTitle = Checker("title", title.length > 6),
            isValidPrice = Checker("price", (price > 0)),
            isValidSeries = Checker("series", series.length > 1),
            isValidCategory = Checker("category", catagoriesInfo.some(cat => cat.name === category)),
            isValidImage = Checker("images", isImagePath(image?.name, image?.type)),
            isValidAmount = Checker("amount", amount > 0),
            isValidDescription = Checker("description", description.length > 10)

        return (
            isValidTitle &&
            isValidPrice &&
            isValidSeries &&
            isValidCategory &&
            isValidImage &&
            isValidAmount &&
            isValidDescription
        )
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
