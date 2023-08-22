import { useState, useEffect } from 'react'
import useApiRequest from './useApiRequest';
import { host } from '@/CONSTANT/API_hostName';
import { useCookies } from 'react-cookie';


export default function useAdminLogIn() {

    const { api } = useApiRequest();

    const [adminData, setAdminData] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [isOut, setIsOut] = useState<boolean>(false);
    const [cookie] = useCookies();

    useEffect(() => {
        if (!!cookie["access-token"] && !!cookie["adminId"]) {
            setIsLoading(true);
            api.get(`${host}admin-log-in/${cookie.adminId}`)
                .then(({ data }) => { setAdminData(data); setIsLogged(true) })
                .catch(() => { setIsError(true); })
                .finally(() => { setIsLoading(false); })
        }
        else setIsOut(true)
    }, [])

    return { adminData, setAdminData, isError, isLoading, isLogged, isOut }
}
