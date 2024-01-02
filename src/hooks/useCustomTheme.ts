import { createTheme, Theme, colors } from "@mui/material";
import { useCookies } from "@abdulrhmangoni/am-store-library";

export default function useCustomTheme(): Theme {

    const { cookies: { AM_Store_admind_panel_theme: mode } } = useCookies();
    const lightBackground = { default: "#f9f9f9", paper: "#fff" }
    const darkBackground = { default: "#111936", paper: "#0a1336" }
    const isLightMode = mode === "light"
    const textColor = isLightMode ? "#000000" : "#fff"
    const successColor = "#11cb1a"

    return createTheme({
        palette: {
            mode: isLightMode ? "light" : "dark",
            primary: { main: colors.indigo["A400"] },
            action: { hover: "3d5afe4d" },
            background: isLightMode ? lightBackground : darkBackground,
            success: { main: successColor, dark: successColor, light: successColor }
        },
        typography: {
            allVariants: {
                color: textColor
            }
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLightMode ? lightBackground.paper : darkBackground.paper,
                        color: textColor
                    }
                }
            }
        }
    })
}

