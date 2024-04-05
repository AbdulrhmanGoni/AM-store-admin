import "normalize.css/normalize.css";
import 'react-toastify/dist/ReactToastify.minimal.css';
import { createContext, useState } from "react";
import AdminAppBar from "./components/AdminBar";
import Box from "@mui/material/Box";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import useAdminLogIn from "./hooks/useAdminLogIn";
import { LoadingCircle, LoadingPage, CustomThemeProvider } from "@abdulrhmangoni/am-store-library";
import { Outlet } from "react-router-dom";
import { AdminData } from "./types/dataTypes";
import LogInForm from "./components/LogInForm";
import Unauthorized from "./components/errors/Unauthorized";
import NetworkError from "./components/errors/NetworkError";
import BadRequest from "./components/errors/BadRequest";
import ServerError from "./components/errors/ServerError";
import UnexpectedError from "./components/errors/UnexpectedError";

export const AdminDataContext = createContext<AdminData | null>(null);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false
    },
  }
});

export default function App() {

  const {
    adminData,
    isLoading,
    isError,
    isNetworkError,
    isLogged,
    isUnauthorized,
    isServerError,
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
                : isLogged ? <>
                  <AdminAppBar />
                  <Box sx={{ p: { xs: 1, md: 2 } }}>
                    <Outlet />
                  </Box>
                </>
                  : logInPage ? <LogInForm />
                    : isUnauthorized ? <Unauthorized action={() => setLogInPage(true)} />
                      : isNetworkError ? <NetworkError />
                        : isError ? <BadRequest />
                          : isServerError ? <ServerError />
                            : isUnexpected ? <UnexpectedError />
                              : null
            }
            <LoadingCircle staticCircle darkBg />
            <ToastContainer limit={4} position="bottom-left" theme="colored" />
          </Box>
        </QueryClientProvider>
      </AdminDataContext.Provider>
    </CustomThemeProvider>
  )
}
