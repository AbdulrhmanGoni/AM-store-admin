import axios from "axios";
import { cookiesParser } from "@abdulrhmangoni/am-store-library";

export default function useApiRequest() {

    const { ["admin-access-token"]: adminAccessToken, adminId } = cookiesParser();

    const headers = {
        'access-token': adminAccessToken,
        'token-id': adminId,
        'Content-Type': 'application/json',
    }

    return { api: axios.create({ headers }), headers }
}
