import { createTheme, SxProps, Theme } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useCookies } from "react-cookie";

export default function useCustomTheme(): { theme: Theme, appStyle: SxProps } {

    const [{ theme: mode }] = useCookies();
    const lightBackground = { default: "#f9f9f9", paper: "#fff" }
    const darkBackground = { default: "#111936", paper: "#0a1336" }

    const theme = createTheme({
        palette: {
            mode: mode === "light" ? "light" : "dark",
            primary: { main: indigo["A400"] },
            action: { hover: "3d5afe4d" },
            background: mode === "light" ? lightBackground : darkBackground,
            success: { main: "#66bb6a" }
        },
        typography: {
            allVariants: {
                color: mode === "light" ? "#000000" : "#fff"
            }
        }
    })

    const { palette: { primary, background, text } } = theme;

    const appStyle: SxProps = {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: background.default,
        "*::-webkit-scrollbar": { bgcolor: text.primary, width: "3px", height: "6px" },
        "*::-webkit-scrollbar-thumb": { bgcolor: primary.main },
        "& input:autofill": {
            boxShadow: `0 0 0 100px ${background.default} inset !important`,
            WebkitTextFillColor: `${text.primary} !important`
        },
        ":root": {
            "--toastify-color-info": primary.main,
            "--toastify-color-dark": background.default
        }
    }

    return {
        theme,
        appStyle
    }
}

