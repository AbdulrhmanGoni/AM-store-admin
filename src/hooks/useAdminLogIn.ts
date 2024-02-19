import { useState, useEffect } from 'react'
import useApiRequest from './useApiRequest';
import { host } from '../CONSTANTS/API_hostName';
import { useCookies } from '@abdulrhmangoni/am-store-library';
import { AdminData } from '../types/dataTypes';
import { AxiosError } from 'axios';


export default function useAdminLogIn() {

    const { api } = useApiRequest();
    const [adminData, setAdminData] = useState<AdminData | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isServerError, setServerError] = useState<boolean>(false);
    const [isNetworkError, setIsNetworkError] = useState<boolean>(false);
    const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);
    const [isUnexpected, setIsUnexpected] = useState<boolean>(false);
    const { cookies: { adminId, ["admin-access-token"]: accessToken } } = useCookies();

    useEffect(() => {
        if (accessToken && adminId) {
            setIsLoading(true);
            api.get(`${host}/admin-log-in/${adminId}`)
                .then(({ data }) => {
                    setAdminData(data);
                    setIsLogged(true);
                    isNetworkError && setIsNetworkError(false);
                    isError && setIsError(false);
                    isUnauthorized && setIsUnauthorized(true);
                })
                .catch((error: AxiosError) => {
                    if (error.response?.status === 401) setIsUnauthorized(true);
                    else if (!navigator.onLine) setIsNetworkError(true);
                    else if (error.response?.status === 400) setIsError(true);
                    else if (!error.response?.status) setIsUnexpected(true);
                    else setServerError(true);
                })
                .finally(() => setIsLoading(false))
        } else {
            setIsUnauthorized(true);
        }
    }, [adminId, accessToken])

    return {
        adminData,
        setAdminData,
        isError,
        isNetworkError,
        isLoading,
        isLogged,
        isUnauthorized,
        isServerError,
        isUnexpected
    }
}
