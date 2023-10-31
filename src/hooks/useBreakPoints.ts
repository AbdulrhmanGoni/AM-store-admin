import { useMediaQuery, useTheme } from "@mui/material"


export default function useBreakPoints() {

    const { breakpoints } = useTheme();

    return {
        xSmallScreen: useMediaQuery(breakpoints.only("xs")),
        smallScreen: useMediaQuery(breakpoints.only("sm")),
        mediumScreen: useMediaQuery(breakpoints.only("md")),
        largeScreen: useMediaQuery(breakpoints.only("lg")),
        xLargeScreen: useMediaQuery(breakpoints.only("xl")),
    }
}
