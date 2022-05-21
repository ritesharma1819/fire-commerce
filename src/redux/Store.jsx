import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { RootReducer } from "./RootReducer";

const composeEnhancers = composeWithDevTools({});
const intialStorage = {
  cartReducer: {
    cartItem: JSON.parse(localStorage.getItem("cartItem")) ?? [],
  },
};
export const store = createStore(
  RootReducer,
  intialStorage,
  composeEnhancers()
);
