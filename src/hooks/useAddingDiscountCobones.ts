import { FormEvent, useRef, useState } from 'react'
import useDiscountInput from './useDiscountInput';
import useDiscountsCobonesActions from './useDiscountsCobonesActions';
import useNotifications from './useNotifications';
import useDiscountCobones from './useDiscountCobones';

type formInput = FormDataEntryValue | null

export default function useAddingDiscountCobones() {

    const [loading, setLoading] = useState<boolean>();
    const coboneNameFieldRef = useRef<HTMLInputElement>();
    const [error, setError] = useState<string>("");
    const { addDiscountCobone } = useDiscountsCobonesActions();
    const { DiscountInput, isValidDiscount, clearInput } = useDiscountInput();
    const { message } = useNotifications();
    const { addCobone } = useDiscountCobones();

    function formValidator(coboneName: formInput, discountValue: formInput): boolean {

        if (!coboneName) {
            setError("Cobone's name required");
            return false;
        } else if (`${coboneName}`.length > 15) {
            setError("Cobone's name must be less than 15 character");
            return false;
        } else if (`${coboneName}`.length < 3) {
            setError("Cobone's name must be greater than 3 character");
            return false;
        }

        if (!discountValue) {
            setError("You didn't specify a discout for the cobone");
            return false;
        } else if (!isValidDiscount(+discountValue)) {
            setError("Invalid discount");
            return false;
        }

        return true
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const coboneName = formData.get("cobone-name");
        const discountValue = formData.get("discount-value");
        const formValidToSubmit = formValidator(coboneName, discountValue)
        if (formValidToSubmit) {
            const payload = { name: `${coboneName}`, value: (+`${discountValue}` / 100) }
            setLoading(true);
            addDiscountCobone(payload)
                .then((coboneId) => {
                    addCobone({ ...payload, id: coboneId })
                    setError("");
                    clearInput();
                    message("The cobone added successfully", "success");
                    if (coboneNameFieldRef.current) {
                        coboneNameFieldRef.current.value = "";
                    }
                })
                .catch((error) => {
                    const message = error.response?.data?.message || "Unexpected Error"
                    setError(message)
                })
                .finally(() => setLoading(false))
        }
    }

    return {
        DiscountInput,
        onSubmit,
        loading,
        error,
        coboneNameFieldRef
    }
}
