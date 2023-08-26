"use client";
import "normalize.css/normalize.css";
import "../global.css";
import 'react-toastify/dist/ReactToastify.css';
import AdminAppBar from "@/components/AdminBar";
import { Box, ThemeProvider, CircularProgress } from "@mui/material";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import themeHandeler from "@/functions/themeHandeler";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import useAdminLogIn from "@/hooks/useAdminLogIn";
import LogInForm from "@/components/LogInForm";
import { ErrorThrower } from "@abdulrhmangoni/am-store-library";


export const ThemeContext = createContext<any>(null);
export const AdminDataContext = createContext<any>(null);

const queryClient = new QueryClient();

export default function Dashboard({ children }) {

  const [mode, setMode] = useState<string>(useCookies()[0].theme ?? "dark");
  const { adminData, setAdminData, isLoading, isError, isNetworkError, isLogged, isOut } = useAdminLogIn();
  const theme = themeHandeler(mode ?? "dark");

  const htmlStyle = {
    "& *::-webkit-scrollbar-thumb": { bgcolor: "primary.main" },
    "& *::-webkit-scrollbar": { bgcolor: "white", width: "3px", height: "6px" },
    ":root": {
      "--toastify-color-info": theme.palette.primary.main,
      "--toastify-color-dark": theme.palette.background.default
    }
  }

  return (
    <SnackbarProvider>
      <ThemeContext.Provider value={setMode}>
        <AdminDataContext.Provider value={[adminData, setAdminData]}>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <Box component="html" lang="en" sx={htmlStyle}>
                <Box component="body" sx={{ bgcolor: "background.default" }}>
                  {
                    isLoading ? <Box sx={loadingCircle}><CircularProgress /></Box>
                      : isLogged ?
                        <Box component="main" id="app" sx={{ display: "flex", minHeight: "100vh" }}>
                          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                            <AdminAppBar />
                            <Box sx={{ p: { xs: 1, md: 2 } }}>
                              {children}
                            </Box>
                          </Box>
                          <ToastContainer limit={4} position="bottom-left" theme="colored" />
                        </Box>
                        : isOut ? <LogInForm />
                          : isNetworkError ? <ErrorThrower
                            title="Network Error"
                            customIllustrate={"/images/no-network-error.png"}
                            message="There is problem in your network, please check your internet"
                            withRefreshButton fullPage
                          />
                            : isError ? <ErrorThrower
                              title="Unexpected Error"
                              customIllustrate={"/images/unexpected-error.png"}
                              message="There is unexpected happends, may its in your network or you dont have the access to this application"
                              fullPage
                            />
                              : null
                  }
                </Box>
              </Box>
            </QueryClientProvider>
          </ThemeProvider>
        </AdminDataContext.Provider>
      </ThemeContext.Provider>
    </SnackbarProvider>
  )
}

const loadingCircle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
  backgroundColor: "#00000080"
}