import {
  createBrowserRouter,
  RouterProvider,
  Link,
  useParams,
} from "react-router-dom";

import ProductList from "./ProductList";
import ProductDetail from "./productDetail";
import LoginPage from "./loginPage";
import ProtectedRoute from "./protectedRoute";
import CreateAccountPage from "./createAccount";
import DeleteAccountPage from "./deleteAccount";
import AccountPage from "./accountPage";
import UpdateAccountPage from "./updatePage";
import AdminPage from "./adminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/createAccount",
    element: <CreateAccountPage />,
  },
  {
    path: "/deleteAccountPage",
    element: <DeleteAccountPage />,
  },
  {
    path: "/accountPage",
    element: <AccountPage />,
  },
  {
    path: "/updateAccountPage",
    element: <UpdateAccountPage />,
  },
  {
    path: "/onlyAdmin",
    element: <AdminPage />,
  },
  {
    path: "/product",
    element: (
      <ProtectedRoute>
        <ProductList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <ProtectedRoute>
        <ProductDetail />
      </ProtectedRoute>
    ),
  },
]);

function Shop() {
  return <RouterProvider router={router} />;
}

export default Shop;
