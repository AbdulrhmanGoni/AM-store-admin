export default function calculatePercentages(total: number, current: number, floatingNumbers?: number): number {
    return +((current / total) * 100).toFixed(floatingNumbers ?? 2)
}
