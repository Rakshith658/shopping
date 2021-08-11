import React from "react";
import { StyleSheet } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import ProductReducer from "./store/Reducers/Products";
import CartReducer from "./store/Reducers/Cart";
// import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import ShopNavigation from "./navigation/ShopNavigation";

const rootReducer = combineReducers({
  Product: ProductReducer,
  Cart: CartReducer,
});

const store = createStore(rootReducer);
const fetchFont = () => {
  return Font.loadAsync({
    Bold: require("./assets/fonts/OpenSans-Regular.ttf"),
    Regular: require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  // const [fontloaed, setfontloaed] = useState(false);
  // if (!fontloaed) {
  //   return (
  //     <AppLoading startAsync={fetchFont} onFinish={() => setfontloaed(true)} />
  //   );
  // }
  return (
    <Provider store={store}>
      <ShopNavigation />
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
