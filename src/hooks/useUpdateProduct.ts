import { useEffect, useState } from 'react'
import useProductsActions from './useProductsActions'
import { productData } from '../types/dataTypes';
import useFormValidationState from './useFormValidationState';
import useProductImagesUploader from './useProductImagesUploader';
import findTheChanges, { findTheChangesReturnType } from '../functions/findUpdateFormChanges';
import useNotifications, { updateLoadingTostProps, updateTostProps } from './useNotifications';
import { useNavigate } from 'react-router-dom';

type errorTypes = "notFound" | "unexpected"

export default function useUpdateProduct({ productId }: { productId: string }) {

    const navigate = useNavigate();
    const {
        titleState, priceState, seriesState, descriptionState,
        amountState, categoryState, imageState, formValidation
    } = useFormValidationState();
    const [theProduct, setProduct] = useState<productData>();
    const [updatingLoading, setUpdatingLoading] = useState<boolean>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [anError, setAnError] = useState<errorTypes>();
    const { getProduct, updateProduct } = useProductsActions();
    const { uploadImages } = useProductImagesUploader();
    const { bySteps } = useNotifications();

    function copmlateUpload(changes: findTheChangesReturnType, productId: string, update: updateTostProps, updateLoading: updateLoadingTostProps) {
        updateLoading("Saving changes...");
        updateProduct(changes, productId)
            .then((res) => {
                if (res) {
                    update("success", "The Product Updated successfully");
                    navigate("/products/edit-product", { replace: true });
                }
                !res && update("warning", "There is Unexpected issue");
            })
            .catch(() => { update("error", "Opse! The Product Fieled update") })
            .finally(() => { setUpdatingLoading(false) })
    }

    function handleSubmit(FormElement: HTMLFormElement) {
        const theForm = new FormData(FormElement);
        const formData = formValidation(theForm);
        if (formData && theProduct) {
            const { update, updateLoading } = bySteps("Updating images...");
            const changes = findTheChanges(theProduct, formData)
            if (changes) {
                setUpdatingLoading(true);
                uploadImages(changes.files)
                    .then((images) => {
                        if (changes.files?.length === images?.length) {
                            const finalChanges = { ...changes, images, files: undefined }
                            copmlateUpload(finalChanges, productId, update, updateLoading);
                        } else {
                            setUpdatingLoading(false);
                            update("error", "There is one image or more failed to upload");
                        }
                    })
            } else {
                update("warning", "There is no changes happends");
            }
        }
    }

    useEffect(() => {
        if (productId) {
            setIsLoading(true)
            getProduct(productId)
                .then((res) => {
                    if (res) setProduct(res)
                    else setAnError("notFound")
                })
                .catch(() => setAnError("unexpected"))
                .finally(() => setIsLoading(false))
        }
    }, [productId])

    return {
        handleSubmit,
        theProduct,
        isLoading,
        anError,
        titleState,
        priceState,
        seriesState,
        descriptionState,
        amountState,
        categoryState,
        imageState,
        updatingLoading
    }
}
