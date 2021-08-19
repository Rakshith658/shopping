import React from "react";
import { StyleSheet } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import ProductReducer from "./store/Reducers/Products";
import CartReducer from "./store/Reducers/Cart";
import OrderReducers from "./store/Reducers/Orders";
// import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

// import ShopNavigation from "./navigation/ShopNavigation";
import ShopDraw from "./navigation/ShopDraw";

const rootReducer = combineReducers({
  Product: ProductReducer,
  Cart: CartReducer,
  Order: OrderReducers,
});

const store = createStore(rootReducer);
// const fetchFonts = () =>
//   font.loadAsync({
//     "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
//     "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
//   });

export default function App() {
  // const [fontloaed, setfontloaed] = useState(false);
  // if (!fontloaed) {
  //   return (
  //     <AppLoading startAsync={fetchFont} onFinish={() => setfontloaed(true)} />
  //   );
  // }
  return (
    <Provider store={store}>
      <ShopDraw />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
