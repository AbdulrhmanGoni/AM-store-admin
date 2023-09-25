import { useTheme } from '@mui/material';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


export type typeMessage = 'info' | 'success' | 'warning' | 'error' | 'default'
type promiseFunc = Promise<any>
interface promiseParams {
    loadingMsg: string,
    successgMsg: string,
    errorMsg: string,
}
export type updateTostProps = (type: typeMessage, message: string) => void
type byStepsType = {
    update: updateTostProps,
    close: () => void,
}


export default function useNotifications() {

    const { palette: { mode } } = useTheme();

    function message(message: string, type: typeMessage, options?: ToastOptions) {
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
                success: { render: params.successgMsg, type: "success" },
                error: { render: params.errorMsg, type: "error" }
            }
        )
    }

    const bySteps = (startLoadingMessage: string): byStepsType => {
        const toastId = toast.loading(startLoadingMessage, { type: "info" })
        return {
            update(type: typeMessage, message: string) {
                toast.update(toastId, { render: message, isLoading: false, type, autoClose: 5000 })
            },
            close() { toast.dismiss(toastId) }
        }
    }
    return { message, toast, promised, bySteps };
}
