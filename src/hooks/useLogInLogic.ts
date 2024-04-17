import { useState } from "react";
import host from "../CONSTANTS/API_hostName";
import useApiRequest from "./useApiRequest";
import { useCookies } from "@abdulrhmangoni/am-store-library";
import useNotifications from "./useNotifications";
import { GoogleUserCredentials, loadingControl } from "@abdulrhmangoni/am-store-library";
import { AdminData } from "../types/dataTypes";

interface SubmitEventProps {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
}
type requestPath = string
type requestBody = {
    adminEmail?: FormDataEntryValue,
    adminPassword?: FormDataEntryValue,
    googleUserCredentials?: GoogleUserCredentials,
}
interface RequestErrorOptions {
    setFailedError?: boolean
}

export default function useLogInLogic() {

    const { api } = useApiRequest();
    const { addCookie } = useCookies();
    const [logInFailed, setFailed] = useState({ isError: false, message: "" });
    const { message } = useNotifications();

    function complateLog({ accessToken, adminData }: { accessToken: string, adminData: AdminData }) {
        const maxAge = 3600 * 24 * 20;
        addCookie("admin-access-token", accessToken, maxAge)
        addCookie("adminId", adminData._id, maxAge)
        window.location.reload();
    }

    function apiRequest(path: requestPath, body: requestBody, errorOptions?: RequestErrorOptions) {
        loadingControl(true)
        api.post(`${host}/admin-log-in/${path}`, body)
            .then(({ data }) => {
                if (data?.ok) complateLog(data);
                else {
                    const errorMessage = data.message || "Unexpected error happened !"
                    if (errorOptions?.setFailedError) {
                        setFailed({ isError: true, message: errorMessage })
                    } else {
                        message(errorMessage, "warning")
                    }
                }
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Unexpected error happened !"
                if (errorOptions?.setFailedError) {
                    setFailed({ isError: true, message: errorMessage })
                } else {
                    message(errorMessage, "error")
                }
            })
            .finally(() => { loadingControl(false) })
    }

    function logInWithGoogle(googleUserCredentials: GoogleUserCredentials) {
        apiRequest("google-auth", { googleUserCredentials })
    }

    function handleSubmit(event: SubmitEventProps) {
        event.preventDefault();
        const data = new FormData(event?.currentTarget);
        const adminEmail = data.get('email')!;
        const adminPassword = data.get('password')!;
        apiRequest("", { adminEmail, adminPassword }, { setFailedError: true })
    }

    return {
        handleSubmit,
        logInWithGoogle,
        logInFailed
    }
}
