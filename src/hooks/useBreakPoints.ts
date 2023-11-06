import { Breakpoint, useMediaQuery, useTheme } from "@mui/material"

type UseBreakPointsProp = "up" | "not" | "down" | "only"
export default function useBreakPoints(type: UseBreakPointsProp = "only") {

    const { breakpoints } = useTheme();

    function useBetweenDevices(start: number | Breakpoint, end: number | Breakpoint) {
        return useMediaQuery(breakpoints.between(start, end))
    }

    return {
        xSmallScreen: useMediaQuery(breakpoints[type]("xs")),
        smallScreen: useMediaQuery(breakpoints[type]("sm")),
        mediumScreen: useMediaQuery(breakpoints[type]("md")),
        largeScreen: useMediaQuery(breakpoints[type]("lg")),
        xLargeScreen: useMediaQuery(breakpoints[type]("xl")),
        useBetweenDevices
    }
}
