
export default function isDatePassed(year: number, month: number) {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const isTimeouted = year < currentYear ? true : (year === currentYear && month < currentMonth);
    return isTimeouted
}
