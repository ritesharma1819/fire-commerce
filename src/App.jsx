import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { store } from "./redux/Store";
import AppRouter from "./route";
import "./styleSheet/authentication.css";
import "./styleSheet/Layout.css";
import "./styleSheet/Product.css";

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
