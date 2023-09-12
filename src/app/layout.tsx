"use client";
import "normalize.css/normalize.css";
import "../global.css";
import 'react-toastify/dist/ReactToastify.css';
import AdminAppBar from "@/components/AdminBar";
import { Box, ThemeProvider } from "@mui/material";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import themeHandeler from "@/functions/themeHandeler";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import useAdminLogIn from "@/hooks/useAdminLogIn";
import LogInForm from "@/components/LogInForm";
import { ErrorThrower, LoadingCircle } from "@abdulrhmangoni/am-store-library";

export const ThemeContext = createContext<any>(null);
export const AdminDataContext = createContext<any>(null);

const queryClient = new QueryClient();

export default function Dashboard({ children }) {

  const [mode, setMode] = useState<string>(useCookies()[0].theme ?? "dark");
  const {
    adminData, setAdminData,
    isLoading, isError,
    isNetworkError, isLogged,
    isOut, isServerError
  } = useAdminLogIn();
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
                <Box
                  component="body"
                  sx={{
                    bgcolor: theme.palette.background.default,
                    color: theme.palette.text.primary
                  }}>
                  {
                    isLoading ? <LoadingCircle darkBg />
                      : isLogged ?
                        <Box component="main" id="app" sx={{ display: "flex", minHeight: "100vh" }}>
                          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                            <AdminAppBar />
                            <Box sx={{ p: { xs: 1, md: 2 } }}>
                              {children}
                            </Box>
                          </Box>
                        </Box>
                        : isOut ? <LogInForm />
                          : isNetworkError ? <ErrorThrower
                            title="Network Error"
                            illustratorType="network"
                            message="There is problem in your network, please check your internet"
                            withRefreshButton fullPage
                          />
                            : isServerError ? <ErrorThrower
                              title="Server Error"
                              illustratorType="server"
                              message="There is unexpected error happends in our server"
                              fullPage
                            />
                              : isError ? <ErrorThrower
                                title="Unexpected Error"
                                illustratorType="unexpected"
                                message="There is unexpected happends, may its in your network or you dont have the access to this application"
                                fullPage
                              />
                                : null
                  }
                  <LoadingCircle staticCircle darkBg />
                  <ToastContainer limit={4} position="bottom-left" theme="colored" />
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