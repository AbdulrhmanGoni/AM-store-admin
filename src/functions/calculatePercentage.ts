export default function calculatePercentages(total: number, current: number, floatingNumbers?: number): number {
    return +((total / current) * 100).toFixed(floatingNumbers ?? 2)
}
