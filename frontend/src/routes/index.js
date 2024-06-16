import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import SingleCategoryProducts from "../pages/SingleCategoryProducts";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel";
import Orders from "../pages/Orders";
import AdminAllOrders from "../pages/AdminAllOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <SingleCategoryProducts />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      { path: "cart", element: <Cart /> },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "success",
        element: <PaymentSuccess />,
      },
      {
        path: "cancel",
        element: <PaymentCancel />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "all-orders",
            element: <AdminAllOrders />,
          },
        ],
      },
    ],
  },
]);

export default router;
