import React from "react";
import { FlatList, Text, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../constant/Colors";
import ProductItem from "../../components/shop/ProductItem";
import * as cartAction from "../../store/action/Cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const Stack = createStackNavigator();

const ProductsOVStackScreen = ({ navigation }) => {
  const dispatch = useDispatch();

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
            onAddToCart={() => {
              dispatch(cartAction.add_to_cart(itemData.item));
            }}
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
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName="ios-cart"
                onPress={() => navigation.navigate("Cart")}
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductsOVStackScreen;
