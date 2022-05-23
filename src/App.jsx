import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CardPage from "./pages/CardPage";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import ProductInfoPage from "./pages/ProductInfoPage";
import RegisterPage from "./pages/RegisterPage";
import "./stylesheet/Product.css";
import "./stylesheet/Layout.css";
import "./stylesheet/authentication.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
