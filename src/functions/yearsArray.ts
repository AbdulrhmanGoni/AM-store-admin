import foundingYear from "../CONSTANTS/foundingYear";

export default function yearsArray(startYear: number = foundingYear) {

    const currentYear = new Date().getFullYear();
    const yearsArray = [startYear];

    for (let i = 0; i < currentYear - startYear; i++) {
        yearsArray.push(startYear + i + 1)
    }

    return yearsArray
}
