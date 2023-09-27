import { useEffect, useState } from 'react'
import useProductsActions from './useProductsActions'
import { productData } from '@/types/dataTypes';
import useFormValidationState from './useFormValidationState';
import useProductImagesUploader from './useProductImagesUploader';
import findTheChanges, { findTheChangesReturnType } from '../functions/findUpdateFormChanges';
import useNotifications, { updateLoadingTostProps, updateTostProps } from '@/hooks/useNotifications';
import { useRouter } from 'next/navigation';

type errorTypes = "notFound" | "unexpected"

export default function useUpdateProduct({ productId }: { productId: string }) {

    const { push } = useRouter();
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
        setUpdatingLoading(true)
        updateLoading("Saving changes...")
        updateProduct(changes, productId)
            .catch(() => { update("error", "Opse! The Product Fieled update") })
            .finally(() => { setUpdatingLoading(false) })
            .then((res) => {
                if (res) {
                    update("success", "The Product Updated successfully")
                    push("products/edit-product")
                }
                !res && update("warning", "There is Unexpected issue")
            })
    }

    function handleSubmit(FormElement: HTMLFormElement) {
        const theForm = new FormData(FormElement);
        const formData = formValidation(theForm);
        if (formData && theProduct) {
            const { update, updateLoading } = bySteps("Updating images...");
            const changes = findTheChanges(theProduct, formData)
            uploadImages(changes.files)
                .then((images) => {
                    const finalChanges = { ...changes, images, files: undefined }
                    copmlateUpload(finalChanges, productId, update, updateLoading);
                })
        }
    }

    useEffect(() => {
        if (productId) {
            setIsLoading(true)
            getProduct(productId)
                .then((res) => {
                    if (!!res) setProduct(res)
                    else setAnError("notFound")
                })
                .catch(() => setAnError("unexpected"))
                .finally(() => setIsLoading(false))
        }
    }, [])

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
