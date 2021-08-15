import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import ProductsOVSCreen from "../screens/shop/ProductsOVSCreen";
import ProductsDetailstackScreen from "../screens/shop/ProductsDetailsScreen";
import CartStackScreen from "../screens/shop/CartScreen";
import ProductsOVStackScreen from "../screens/shop/ProductsOVSCreen";
// import OrdersStackScreen from "../screens/shop/OrdersScreen";
// import DrawerContent from "./ShopDraw";

const Stack = createStackNavigator();

function ShopNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={ProductsOVStackScreen} />
      <Stack.Screen name="Details" component={ProductsDetailstackScreen} />
      <Stack.Screen name="Cart" component={CartStackScreen} />
    </Stack.Navigator>
  );
}

export default ShopNavigation;
