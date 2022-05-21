import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { RootReducer } from "./RootReducer";

const composeEnhancers = composeWithDevTools({});
export const store = createStore(RootReducer, composeEnhancers());
