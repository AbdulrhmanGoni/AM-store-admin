import { useState } from "react";
import host from "../CONSTANT/API_hostName";
import useApiRequest from "./useApiRequest";
import { useCookies } from "react-cookie";
import useNotifications from "./useNotifications";
import { loadingControl } from "@abdulrhmangoni/am-store-library";
import { AdminData } from "@/types/dataTypes";

interface SubmitEventProps {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
}
type ErrorStateProps = { state: boolean, message: string }
type requestPath = string
type requestBody = {
    adminEmail?: FormDataEntryValue,
    adminPassword?: FormDataEntryValue,
}
type requestResponse = null | false
type requestFeedback = (response: requestResponse) => void



export default function useLogInLogic() {

    const { api } = useApiRequest();
    const setCookies = useCookies()[1];
    const [logInFailed, setFailed] = useState<ErrorStateProps>({ state: true, message: "" });
    const { message } = useNotifications();

    function complateLog({ accessToken, adminData }: { accessToken: string, adminData: AdminData }) {
        const maxAge = 3600 * 24 * 20;
        setCookies("admin-access-token", accessToken, { maxAge })
        setCookies("adminId", adminData._id, { maxAge })
        window.location.reload();
    }

    function apiRequest(path: requestPath, body: requestBody, feedback: requestFeedback) {
        loadingControl(true)
        api.post(`${host}/admin-log-in/${path}`, body)
            .then(({ data }) => { if (data) complateLog(data); else feedback(data) })
            .catch(() => { message("Unexpected error happened !", "error") })
            .finally(() => { loadingControl(false) })
    }

    function logInWithGoogle(userInfo: { email?: string, email_verified?: boolean, name?: string }) {
        const adminEmail = userInfo.email;
        apiRequest(
            "google-auth", { adminEmail },
            (response: requestResponse) => {
                if (response === false) {
                    message("Your email registred by another signing up method", "warning")
                } else if (response === null) {
                    message("You didn't have registered with us before", "error")
                }
            }
        )
    }

    function handleSubmit(event: SubmitEventProps) {
        event.preventDefault();
        const data = new FormData(event?.currentTarget);
        const adminEmail = data.get('email')!;
        const adminPassword = data.get('password')!;
        apiRequest(
            "", { adminEmail, adminPassword },
            (response: requestResponse) => {
                if (response === false) {
                    message("Your email registred by another signing up method", "warning");
                } else {
                    !response && setFailed({
                        state: false,
                        message: "There is issue in email or password, Try again with more verify"
                    })
                }
            }
        )
    }

    return {
        handleSubmit,
        logInWithGoogle,
        logInFailed
    }
}
