import "normalize.css/normalize.css";
import 'react-toastify/dist/ReactToastify.minimal.css';
import { createContext, useState } from "react";
import AdminAppBar from "./components/AdminBar";
import { Box, Button } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import useAdminLogIn from "./hooks/useAdminLogIn";
import {
  IllustrationCard,
  LoadingCircle,
  LoadingPage,
  CustomThemeProvider
} from "@abdulrhmangoni/am-store-library";
import { Outlet } from "react-router-dom";
import { AdminData } from "./types/dataTypes";
import LogInForm from "./components/LogInForm";

export const AdminDataContext = createContext<AdminData | null>(null);

export default function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false
      },
    }
  });
  const {
    adminData,
    isLoading, isError,
    isNetworkError, isLogged,
    isUnauthorized, isServerError,
    isUnexpected
  } = useAdminLogIn();
  const [logInPage, setLogInPage] = useState<boolean>(false);

  return (
    <CustomThemeProvider site="admin-panel">
      <AdminDataContext.Provider value={adminData}>
        <QueryClientProvider client={queryClient}>
          <Box
            id="app"
            className="flex-column full-height-vh"
            sx={({ palette: { background, primary, text } }) => {
              return {
                overflow: "auto",
                bgcolor: "background.default",
                "*::-webkit-scrollbar, &::-webkit-scrollbar": { bgcolor: background.paper },
                "*::-webkit-scrollbar-thumb, &::-webkit-scrollbar-thumb": { bgcolor: primary.main },
                "& input:autofill": {
                  boxShadow: `0 0 0 100px ${background.default} inset !important`,
                  WebkitTextFillColor: `${text.primary} !important`
                }
              }
            }}
          >
            {
              isLoading ? <LoadingPage />
                : isLogged ? <AppContent />
                  : logInPage ? <LogInForm />
                    : isUnauthorized ? <Unauthorized action={() => setLogInPage(true)} />
                      : isNetworkError ? <NetworkError />
                        : isError ? <BadRequest />
                          : isServerError ? <ServerError />
                            : isUnexpected ? <UnexpectedError />
                              : null
            }
          </Box>
          <LoadingCircle staticCircle darkBg />
          <ToastContainer limit={4} position="bottom-left" theme="colored" />
        </QueryClientProvider>
      </AdminDataContext.Provider>
    </CustomThemeProvider>
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
    <IllustrationCard
      title="Server Error"
      illustratorType="server"
      message="There is unexpected error happends in our server"
      fullPage withRefreshButton
    />
  )
}

function NetworkError() {
  return (
    <IllustrationCard
      title="Network Error"
      illustratorType="network"
      message="There is problem in your network, please check your internet"
      withRefreshButton fullPage
    />
  )
}

function BadRequest() {
  return (
    <IllustrationCard
      title="Bad Request"
      illustratorType="unexpected"
      message="This Error happends may because of your network or because the server recived unexpected input"
      fullPage withRefreshButton
    />
  )
}

function UnexpectedError() {
  return (
    <IllustrationCard
      title="Unexpected Error"
      illustratorType="unexpected"
      message="There is unexpected happends, refrech the page and try again"
      fullPage withRefreshButton
    />
  )
}

function Unauthorized({ action }: { action: () => void }) {
  return (
    <IllustrationCard
      title="You are not authorized"
      illustratorType="unauthorized"
      hideAlertMsg fullPage
    >
      <Button onClick={action} variant="contained">log In</Button>
    </IllustrationCard>
  )
}