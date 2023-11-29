import { submetEvent } from "../types/interfaces";
import clearForm from "../functions/clearForm";
import useFormValidationState from "./useFormValidationState";
import { useState } from "react";
import useNotifications, { updateTostProps } from "./useNotifications";
import useAsyncActions from "./useProductsActions";
import useProductImagesUploader from "./useProductImagesUploader";
import { productData } from "../types/dataTypes";


export default function useAddProducts() {

    const {
        titleState, priceState, seriesState, descriptionState,
        amountState, categoryState, imageState, formValidation
    } = useFormValidationState();
    const { uploadImages } = useProductImagesUploader();
    const { bySteps } = useNotifications();
    const { addNewProduct } = useAsyncActions();
    const [isLoading, setIsLoading] = useState(false);
    const [addingDone, setAddingDone] = useState(false);

    function copmlateAddingProduct(productData: productData, update: updateTostProps) {
        setIsLoading(true);
        addNewProduct(productData)
            .then(res => {
                if (res) {
                    update("success", "The product added successfully");
                    clearForm("addProductForm");
                    setAddingDone(true);
                    setTimeout(() => { setAddingDone(false) }, 2000)
                }
            })
            .catch(() => { update("error", "Addeding product failed! try again") })
            .finally(() => { setIsLoading(false) });
    }

    function handleSubmit(event: submetEvent): void {
        event.preventDefault();
        const theForm = new FormData(event.currentTarget);
        const formData = formValidation(theForm);
        if (formData) {
            setIsLoading(true);
            const { update } = bySteps("Uploading product's images...");
            uploadImages(formData.files)
                .then((imagesList) => {
                    if (imagesList) {
                        const theProduct: productData = {
                            ...formData,
                            images: imagesList!,
                            files: [null]
                        }
                        copmlateAddingProduct(theProduct, update);
                    } else {
                        update("error", "Uploading product images failed! try again");
                    }
                })
                .finally(() => { setIsLoading(false) });
        }
    }

    return {
        handleSubmit,
        titleState,
        priceState,
        seriesState,
        descriptionState,
        amountState,
        categoryState,
        imageState,
        isLoading,
        addingDone
    }
}
