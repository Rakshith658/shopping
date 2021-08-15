import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OrdersStackScreen from "../screens/shop/OrdersScreen";
// import ShopNavigation from "./ShopNavigation";
import ProductsOVStackScreen from "../screens/shop/ProductsOVSCreen";
import ProductsDetailstackScreen from "../screens/shop/ProductsDetailsScreen";
import CartStackScreen from "../screens/shop/CartScreen";
import ShopNavigation from "./ShopNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import UserProductsStackScreen from "../screens/user/UserProductsScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ShopDraw = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
      //  drawerContent={(p) => <DrawerContainer {...p} />}
      >
        <Drawer.Screen name="App" component={ShopNavigation} />
        <Drawer.Screen name="Order" component={OrdersStackScreen} />
        <Drawer.Screen
          name="UserProducts"
          component={UserProductsStackScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const DrawerContainer = (props) => {
  return (
    <View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Rakshith</Text>
        </View>
        <DrawerItem
          label="Help"
          onPress={() => Linking.openURL("https://mywebsite.com/help")}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default ShopDraw;
