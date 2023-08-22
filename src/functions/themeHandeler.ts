import { createTheme, Theme } from "@mui/material";
import { indigo } from "@mui/material/colors";

export default function themeHandeler(mode: string): Theme {
    const modeBg = mode === "light" ? "#fff" : "#111936";
    return createTheme({
        palette: {
            mode: mode === "light" ? "light" : "dark",
            primary: { main: indigo["A400"] },
            action: { hover: "3d5afe4d" },
            background: { default: modeBg, paper: modeBg }
        }
    })
}

