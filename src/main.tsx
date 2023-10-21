import './global.css'
import "normalize.css/normalize.css";
// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import SalesStatisticsPage from './pages/SalesStatisticsPage.tsx'
import OrdersManagementPage from './pages/OrdersManagementPage.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<SalesStatisticsPage />} />
      <Route path='orders' element={<OrdersManagementPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
)
