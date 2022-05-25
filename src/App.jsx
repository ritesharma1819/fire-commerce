import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./pages/AdminPage";
import CardPage from "./pages/CardPage";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import OrderPage from "./pages/OrderPage";
import ProductInfoPage from "./pages/ProductInfoPage";
import RegisterPage from "./pages/RegisterPage";
import "./styleSheet/authentication.css";
import "./styleSheet/Layout.css";
import "./styleSheet/Product.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <CardPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoutes>
                <OrderPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoutes>
                <AdminPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoutes>
                <ProductInfoPage />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
