import React from "react";
import { FlatList, Text, Platform } from "react-native";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../constant/Colors";
import ProductItem from "../../components/shop/ProductItem";

const Stack = createStackNavigator();

const ProductsOVStackScreen = ({ navigation }) => {
  const onAddToCart = () => {
    navigation.navigate("Cart");
  };
  const ProductsOVScreen = () => {
    const Product = useSelector((state) => state.Product.availableProducts);
    return (
      <FlatList
        data={Product}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {
              navigation.navigate("Details", { productId: itemData.item.id });
            }}
            onAddToCart={onAddToCart}
          />
        )}
      />
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductsOVScreen"
        component={ProductsOVScreen}
        options={{
          headerTitle: "All Products",
          headerStyle: {
            backgroundColor: Platform.OS == "android" ? Colors.primary : "",
          },
          headerTintColor: Platform.OS == "android" ? "white" : Colors.primary,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductsOVStackScreen;
