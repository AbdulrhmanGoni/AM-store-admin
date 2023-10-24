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
import ProductsManagementPage from './pages/ProductsManagementPage.tsx';
import AddProductsPage from './pages/AddProductsPage.tsx';
import EditProductPage from './pages/EditProductPage.tsx';
import ProductsStatisticsPage from './pages/ProductsStatisticsPage.tsx';
import UsersPage from './pages/UsersPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<SalesStatisticsPage />} />
      <Route path='orders' element={<OrdersManagementPage />} />
      <Route path='products'>
        <Route path='products-management' element={<ProductsManagementPage />} />
        <Route path='products-statistics' element={<ProductsStatisticsPage />} />
        <Route path='add-products' element={<AddProductsPage />} />
        <Route path='edit-product/:productId?' element={<EditProductPage />} />
      </Route>
      <Route path='users' element={<UsersPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
)
