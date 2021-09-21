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
import { ShopNavigation, UserNavigation } from "./ShopNavigation";
import { Text, View } from "react-native";

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
        <Drawer.Screen name="UserProducts" component={UserNavigation} />
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
