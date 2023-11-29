import { Box, alpha, capitalize } from "@mui/material";
import P, { PProps } from "../P";
import calculatePercentages from "../../functions/calculatePercentage";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { CategoryStatistics } from "../../hooks/useCategoriesStatistics";


interface CategoryStatisticsCardProps {
    category: CategoryStatistics,
    cardColor: string,
    total: number
}

export default function CategoryStatisticsCard({ category: cat, cardColor, total }: CategoryStatisticsCardProps) {

    const rowClass = "flex-row-center-between full-width";
    const { category, totalEarnings, productsCount, productsSold } = cat;
    const PProps: PProps = { className: rowClass, variant: "body1" }

    return (
        <Box
            id={category}
            component="div"
            className="flex-column-center"
            sx={{
                maxHeight: "160px",
                minWidth: "190px",
                bgcolor: alpha(cardColor, .2),
                borderRadius: 1,
                p: 1, gap: .25,
                userSelect: "none",
                flex: 1
            }}>
            <Box sx={{ mb: 1 }} className={rowClass}>
                <P className="flex-row-center-start gap1">
                    <Box
                        component="span"
                        sx={{
                            width: 15,
                            height: 15,
                            borderRadius: "50%",
                            bgcolor: cardColor
                        }} />
                    {capitalize(category)}
                </P>
                <P color={cardColor}>{calculatePercentages(total, totalEarnings)}%</P>
            </Box>
            <P {...PProps}>Earnings <Box component="span">${nDecorator(totalEarnings.toFixed(0))}</Box></P>
            <P {...PProps}>Products Count <Box component="span">{productsCount}</Box></P>
            <P {...PProps}>Products Sold <Box component="span">{productsSold}</Box></P>
        </Box>
    )
}
