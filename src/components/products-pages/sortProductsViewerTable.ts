import { GridSortCellParams } from "@mui/x-data-grid";

export default function sortProductsViewerTable(
    val1: string,
    val2: string,
    cell1: GridSortCellParams,
    cell2: GridSortCellParams
) {
    if (cell1.field == "rate") {
        const price1 = +String(cell1.api?.getRow(cell1.id)?.price)[0]
        const price2 = +String(cell2.api?.getRow(cell2.id)?.price)[0]
        return price1 - price2;
    } else {
        return +val1?.replaceAll(",", "") - +val2?.replaceAll(",", "")
    }
}
