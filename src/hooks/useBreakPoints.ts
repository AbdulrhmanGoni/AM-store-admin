import { useMediaQuery, useTheme } from "@mui/material"


export default function useBreakPoints(type: "up" | "not" | "down" | "only" = "only") {

    const { breakpoints } = useTheme();

    return {
        xSmallScreen: useMediaQuery(breakpoints[type]("xs")),
        smallScreen: useMediaQuery(breakpoints[type]("sm")),
        mediumScreen: useMediaQuery(breakpoints[type]("md")),
        largeScreen: useMediaQuery(breakpoints[type]("lg")),
        xLargeScreen: useMediaQuery(breakpoints[type]("xl")),
    }
}
