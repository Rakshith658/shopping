import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsOVSCreen from "../screens/shop/ProductsOVSCreen";
import ProductsDetailstackScreen from "../screens/shop/ProductsDetailsScreen";
import CartStackScreen from "../screens/shop/CartScreen";

const Stack = createStackNavigator();

function ShopNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={ProductsOVSCreen} />
        <Stack.Screen name="Details" component={ProductsDetailstackScreen} />
        <Stack.Screen name="Cart" component={CartStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ShopNavigation;
