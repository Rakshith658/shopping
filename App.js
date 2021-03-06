import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import ProductReducer from "./store/Reducers/Products";
import CartReducer from "./store/Reducers/Cart";
import OrderReducers from "./store/Reducers/Orders";
import ShopDraw from "./navigation/ShopDraw";
import { AuthReducer } from "./store/Reducers/Auth";

const rootReducer = combineReducers({
  Product: ProductReducer,
  Cart: CartReducer,
  Order: OrderReducers,
  auth: AuthReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <ShopDraw />
    </Provider>
  );
}
