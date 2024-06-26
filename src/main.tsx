import "normalize.css/normalize.css";
import "@abdulrhmangoni/am-store-library/dist/cjs/global.css";
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import App from './App.tsx'
import SalesStatisticsPage from './pages/SalesStatisticsPage.tsx'
import OrdersManagementPage from './pages/OrdersManagementPage.tsx';
import ProductsManagementPage from './pages/ProductsManagementPage.tsx';
import AddProductsPage from './pages/AddProductsPage.tsx';
import EditProductPage from './pages/EditProductPage.tsx';
import ProductsStatisticsPage from './pages/ProductsStatisticsPage.tsx';
import UsersPage from './pages/UsersPage.tsx';
import UsersFeedbacksPage from './pages/UsersFeedbacksPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import DiscountsCobonsPage from './pages/DiscountsCobonsPage.tsx';
import SettingsPage from "./pages/SettingsPage.tsx";

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
        <Route path='cobones-and-discounts' element={<DiscountsCobonsPage />} />
      </Route>
      <Route path='users' element={<UsersPage />} />
      <Route path='users-feedbacks' element={<UsersFeedbacksPage />} />
      <Route path='settings' element={<SettingsPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
