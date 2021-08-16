import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../constant/Colors";
import ProductItem from "../../components/shop/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { remove_user_item } from "../../store/action/Products";

const Stack = createStackNavigator();

const UserProductsStackScreen = ({ navigation }) => {
  const userProducts = useSelector((state) => state.Product.userProducts);
  const dispatch = useDispatch();
  const UserProductsScreen = () => {
    return (
      <FlatList
        data={userProducts}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() =>
              navigation.navigate("Edite", {
                productId: itemData.item.id,
              })
            }
            onAddToCart={() => {
              dispatch(remove_user_item(itemData.item.id));
            }}
            user
          />
        )}
      />
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserProductsScreen"
        component={UserProductsScreen}
        options={{
          headerTitle: "My Products",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: "white",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Add"
                iconName="ios-create"
                onPress={() => navigation.navigate("Edite")}
              />
            </HeaderButtons>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default UserProductsStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
