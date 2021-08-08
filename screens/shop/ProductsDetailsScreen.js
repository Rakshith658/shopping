import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../constant/Colors";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const ProductsDetailstackScreen = ({ route }) => {
  const proId = route.params.productId;
  const Prod = useSelector((state) =>
    state.Product.availableProducts.find((p) => p.id === proId)
  );
  const ProductsDetailScreen = () => {
    return (
      <ScrollView>
        <Text>Rakshit</Text>
      </ScrollView>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductsDetailScreen"
        component={ProductsDetailScreen}
        options={{
          headerTitle: Prod.title,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductsDetailstackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
