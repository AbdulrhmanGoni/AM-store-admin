import { useEffect, useState } from "react";
import useNotifications from "./useNotifications";
import { loadingControl } from "@abdulrhmangoni/am-store-library";
import useProductsActions from "./useProductsActions";
import { productFullType } from "../types/dataTypes";

export default function useProduct({ productId, closeFn }: { productId: string, closeFn: () => void }) {

    const { getProduct, deleteProduct, removeDiscountFromProducts } = useProductsActions();
    const { message } = useNotifications();
    const [product, setProduct] = useState<productFullType>();
    const [productDiscount, setProductDiscount] = useState<number>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [cardsOpacity, setCardsOpacity] = useState<number>(0);

    useEffect(() => {
        if (!product) {
            const controller = new AbortController();
            const signal = controller.signal;
            setIsLoading(true)
            getProduct(productId, signal)
                .then((data) => {
                    setProduct(data);
                    setProductDiscount(data?.discount)
                })
                .catch(() => { setIsError(true) })
                .finally(() => { setIsLoading(false) })
            return () => { controller.abort() }
        }
    }, [productId]);

    useEffect(() => { setCardsOpacity(1) }, [productId]);

    function deleteTheProduct() {
        if (product?._id) {
            loadingControl(true);
            return deleteProduct(product?._id)
                .then(() => {
                    message("The product deleted successully", "success");
                    closeFn();
                    return true
                })
                .catch(() => {
                    message("Failed to deleted product", "error");
                    return false
                })
                .finally(() => loadingControl(false))
        }
    }

    function removeDiscount() {
        if (product?._id) {
            loadingControl(true);
            removeDiscountFromProducts([product._id])
                .then(() => { setProductDiscount(0) })
                .catch((error) => {
                    const errorMessage = error.response?.data?.message || "Unexpected error happened";
                    message(errorMessage, "error")
                })
                .finally(() => loadingControl(false))
        }
    }

    const actionAlertMessage = "Make sure if you continue, You will not be able to undo this process after that";

    return {
        product,
        isLoading,
        isError,
        productDiscount,
        deleteTheProduct,
        actionAlertMessage,
        removeDiscount,
        setProductDiscount,
        cardsOpacity,
        setCardsOpacity
    }
}
