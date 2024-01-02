import axios from "axios";
import { useCookies } from "@abdulrhmangoni/am-store-library";

export default function useApiRequest() {

    const {
        cookies: {
            "admin-access-token": adminAccessToken,
            adminId
        }
    } = useCookies()
    const headers = {
        'access-token': adminAccessToken,
        'token-id': adminId,
        'Content-Type': 'application/json',
    }

    return { api: axios.create({ headers }), headers }
}
