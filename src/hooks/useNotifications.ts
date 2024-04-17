import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export type messageType = 'info' | 'success' | 'warning' | 'error' | 'default'
type promiseFunc = Promise<unknown>
interface promiseParams {
    loadingMsg: string,
    successgMsg: string,
    errorMsg: string,
}
export type updateTostProps = (type: messageType, message: string) => void
export type updateLoadingTostProps = (message: string) => void
type byStepsType = {
    update: updateTostProps,
    updateLoading: updateLoadingTostProps,
    close: () => void,
}

export default function useNotifications() {

    function message(message: string, type?: messageType, options?: ToastOptions) {
        toast(message, {
            pauseOnHover: true,
            pauseOnFocusLoss: true,
            type, ...options
        })
    }

    function promised(asyncFun: promiseFunc, params: promiseParams) {
        return toast.promise(
            asyncFun,
            {
                pending: { render: params.loadingMsg, type: "info" },
                success: {
                    render: params.successgMsg, type: "success"
                },
                error: { render: params.errorMsg, type: "error" }
            }
        )
    }

    const bySteps = (startLoadingMessage: string): byStepsType => {
        const toastId = toast.loading(startLoadingMessage, { type: "info" })
        return {
            update(type: messageType, message: string) {
                toast.update(toastId, { render: message, isLoading: false, type, autoClose: 5000 })
            },
            updateLoading(message: string) {
                toast.update(toastId, { render: message, isLoading: true, type: "info", autoClose: false })
            },
            close() { toast.dismiss(toastId) }
        }
    }

    return { message, toast, promised, bySteps };
}
