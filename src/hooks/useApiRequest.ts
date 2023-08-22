import axios from "axios";
import { useCookies } from "react-cookie";


export default function useApiRequest() {

    const headers = {
        'access-token': useCookies()[0]["access-token"],
        'token-id': useCookies()[0]["token-id"],
        'Content-Type': 'application/json',
    }

    return { api: axios.create({ headers }) }
}
