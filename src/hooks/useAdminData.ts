import { useContext } from "react"
import { AdminDataContext } from "../App"
export default function useAdminData() { return useContext(AdminDataContext) }