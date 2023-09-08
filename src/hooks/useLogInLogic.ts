import { useState } from "react";
import host from "@/CONSTANT/API_hostName";
import useApiRequest from "./useApiRequest";
import { useCookies } from "react-cookie";
import useAdminData from "./useAdminData";
import useNotifications from "./useNotifications";

interface SubmitEventProps {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
}
type ErrorStateProps = { state: boolean, message: string }


export default function useLogInLogic() {

    const { api } = useApiRequest();
    const setCookies = useCookies()[1];
    const setAdminData = useAdminData()[1];
    const [logInFailed, setFailed] = useState<ErrorStateProps>({ state: true, message: "" });
    const { message } = useNotifications()

    function complateLog({ accessToken, adminData }) {
        let maxAge = 3600 * 24 * 20;
        setCookies("admin-access-token", accessToken, { maxAge })
        setCookies("adminId", adminData._id, { maxAge })
        setAdminData(adminData);
        window.location.reload();
    }

    function logInWithGoogle(userInfo: { email?: string, email_verified?: boolean, name?: string }) {
        const adminEmail = userInfo.email;
        api.post(`${host}admin-log-in/google-auth`, { adminEmail })
            .then(({ data }) => {
                !!data && complateLog(data)
                if (data === false) {
                    message("Your email registred by another signing up method", "warning")
                } else if (data === null) {
                    message("You didn't have registered with us before", "error")
                }
            })
            .catch(() => { message("Unexpected error happened !", "error") })
            .finally(() => { })
    }

    function handleSubmit(event: SubmitEventProps) {
        event.preventDefault();
        const data = new FormData(event?.currentTarget);
        const adminEmail = data.get('email');
        const adminPassword = data.get('password');
        api.post(`${host}admin-log-in`, { adminEmail, adminPassword })
            .then(({ data }) => {
                !!data && complateLog(data)
                if (data === false) {
                    message("Your email registred by another signing up method", "warning")
                } else {
                    !data && setFailed({
                        state: false,
                        message: "There is issue in email or password, Try again with more verify"
                    })
                }
            })
            .catch(() => { })
            .finally(() => { })
    }

    return {
        handleSubmit,
        logInWithGoogle,
        logInFailed
    }
}
