import { rangeArray } from "@abdulrhmangoni/am-store-library";
import useSettings from "./useSettings"

export default function useYearsArray() {

    const { data, isLoading, isError } = useSettings();

    const currentYear = new Date().getFullYear()
    const yearsArray = rangeArray(data?.foundingYear || currentYear, currentYear)

    return {
        foundingYear: data?.foundingYear,
        yearsArray,
        isLoading,
        isError
    }
}