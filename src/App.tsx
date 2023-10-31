import "normalize.css/normalize.css";
import 'react-toastify/dist/ReactToastify.css';
import { createContext } from "react";
import AdminAppBar from "./components/AdminBar";
import { Box, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import useAdminLogIn from "./hooks/useAdminLogIn";
import LogInForm from "./components/LogInForm";
import { ErrorThrower, LoadingCircle, LoadingPage } from "@abdulrhmangoni/am-store-library";
import { Outlet } from "react-router-dom";
import { AdminData } from "./types/dataTypes";
import useCustomTheme from "./hooks/useCustomTheme";

export const AdminDataContext = createContext<AdminData | null>(null);

export default function App() {

  const queryClient = new QueryClient();

  const {
    adminData,
    isLoading, isError,
    isNetworkError, isLogged,
    isOut, isServerError
  } = useAdminLogIn();

  const theme = useCustomTheme();

  return (
    <ThemeProvider theme={theme}>
      <AdminDataContext.Provider value={adminData}>
        <QueryClientProvider client={queryClient}>
          <Box
            id="app"
            className="flex-column full-height-vh"
            sx={{
              overflow: "auto",
              bgcolor: "background.default",
              "*::-webkit-scrollbar, &::-webkit-scrollbar": { bgcolor: "background.paper" },
              "*::-webkit-scrollbar-thumb, &::-webkit-scrollbar-thumb": { bgcolor: "primary.main" },
              "& input:autofill": {
                boxShadow: `0 0 0 100px ${theme.palette.background.default} inset !important`,
                WebkitTextFillColor: `${theme.palette.text.primary} !important`
              }
            }}>
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
      </AdminDataContext.Provider>
    </ThemeProvider>
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