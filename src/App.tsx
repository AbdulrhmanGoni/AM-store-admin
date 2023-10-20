import "normalize.css/normalize.css";
import 'react-toastify/dist/ReactToastify.css';
import { createContext } from "react";
import AdminAppBar from "./components/AdminBar";
import { Box, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import themeHandeler from "./functions/themeHandeler";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import useAdminLogIn from "./hooks/useAdminLogIn";
import LogInForm from "./components/LogInForm";
import { ErrorThrower, LoadingCircle, LoadingPage } from "@abdulrhmangoni/am-store-library";
import { Outlet } from "react-router-dom";
import { AdminData } from "./types/dataTypes";
import SwitchThemeContext from "./components/SwitchThemeContext";

export const AdminDataContext = createContext<AdminData | null>(null);

export default function App() {

  const queryClient = new QueryClient();

  const {
    adminData,
    isLoading, isError,
    isNetworkError, isLogged,
    isOut, isServerError
  } = useAdminLogIn();
  const theme = themeHandeler(useCookies()[0].theme ?? "dark");
  const { palette: { primary, background, text } } = theme

  const AppStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    "& *::-webkit-scrollbar-thumb": { bgcolor: "primary.main" },
    "& *::-webkit-scrollbar": { bgcolor: "white", width: "3px", height: "6px" },
    "& input:autofill": {
      boxShadow: `0 0 0 100px ${background.default} inset !important`,
      WebkitTextFillColor: `${text.primary} !important`
    },
    ":root": {
      "--toastify-color-info": primary.main,
      "--toastify-color-dark": background.default
    }
  }

  return (
    <AdminDataContext.Provider value={adminData}>
      <SwitchThemeContext>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Box sx={AppStyle}>
              {
                isLoading ? <LoadingPage />
                  : isLogged ? <AppContent />
                    : isOut ? <LogInForm />
                      : isNetworkError ? <NetworkError />
                        : isServerError ? <ServerError />
                          : isError ? <UnexpectedError />
                            : null
              }
            </Box>
            <LoadingCircle staticCircle darkBg />
            <ToastContainer limit={4} position="bottom-left" theme="colored" />
          </QueryClientProvider>
        </ThemeProvider>
      </SwitchThemeContext>
    </AdminDataContext.Provider>
  )
}

function AppContent() {
  return (
    <>
      <AdminAppBar />
      <Box sx={{ p: { xs: 1, md: 2 } }}>
        <Outlet />
      </Box>
    </>
  )
}

function ServerError() {
  return (
    <ErrorThrower
      title="Server Error"
      illustratorType="server"
      message="There is unexpected error happends in our server"
      fullPage
    />
  )
}

function NetworkError() {
  return (
    <ErrorThrower
      title="Network Error"
      illustratorType="network"
      message="There is problem in your network, please check your internet"
      withRefreshButton fullPage
    />
  )
}

function UnexpectedError() {
  return (
    <ErrorThrower
      title="Unexpected Error"
      illustratorType="unexpected"
      message="There is unexpected happends, may its in your network or you dont have the access to this application"
      fullPage
    />
  )
}