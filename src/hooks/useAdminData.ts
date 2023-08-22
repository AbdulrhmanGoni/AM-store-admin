import { AdminDataContext } from '@/app/layout';
import { useContext } from 'react'
export default function useAdminData() { return useContext(AdminDataContext) }