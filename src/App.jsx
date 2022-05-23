import { BrowserRouter, Route, Routes } from "react-router-dom";
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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CardPage />} />
          <Route path="/product/:id" element={<ProductInfoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
