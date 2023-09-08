import { useState, useEffect } from 'react'
import useApiRequest from './useApiRequest';
import { host } from '@/CONSTANT/API_hostName';
import { useCookies } from 'react-cookie';


export default function useAdminLogIn() {

    const { api } = useApiRequest();

    const [adminData, setAdminData] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isServerError, setServerError] = useState<boolean>(false);
    const [isNetworkError, setIsNetworkError] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [isOut, setIsOut] = useState<boolean>(false);
    const [cookie] = useCookies();

    useEffect(() => {
        setIsLoading(true);
        api.get(`${host}admin-log-in/${cookie.adminId}`)
            .then(({ data }) => {
                setAdminData(data);
                setIsLogged(true)
                isNetworkError && setIsNetworkError(false);
                isError && setIsError(false)
            })
            .catch((error) => {
                if (!error.response?.status) {
                    setServerError(true);
                } else if (!navigator.onLine) {
                    setIsNetworkError(true);
                } else if (!(!!cookie["admin-access-token"] && !!cookie["adminId"])) {
                    setIsOut(true);
                } else setIsError(true);
            })
            .finally(() => { setIsLoading(false); })
    }, [])

    return {
        adminData, setAdminData,
        isError, isNetworkError,
        isLoading, isLogged, isOut,
        isServerError
    }
}
