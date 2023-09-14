import { createTheme, Theme } from "@mui/material";
import { indigo } from "@mui/material/colors";

type backgroundTypes = { default: string, paper: string }
export default function themeHandeler(mode: string): Theme {

    const lightBackground = { default: "#e9ebf3", paper: "#fff" }
    const darkBackground = { default: "#111936", paper: "#0a1336" }
    const background: backgroundTypes = mode === "light" ? lightBackground : darkBackground;

    return createTheme({
        palette: {
            mode: mode === "light" ? "light" : "dark",
            primary: { main: indigo["A400"] },
            action: { hover: "3d5afe4d" },
            background
        }
    })
}

