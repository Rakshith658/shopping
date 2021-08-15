import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../constant/Colors";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const EditeProductsStackScreen = () => {
  const userProducts = useSelector((state) => state.Product.userProducts);

  const EditeProductsScreen = () => {
    return (
      <View>
        <Text>Rakshith</Text>
      </View>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EditeProductsScreen"
        component={EditeProductsScreen}
        options={{
          headerTitle: "All Products",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

export default EditeProductsStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
