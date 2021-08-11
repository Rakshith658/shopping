import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../constant/Colors";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import { remove_from_cart } from "../../store/action/Cart";

const Stack = createStackNavigator();

const CartStackScreen = () => {
  const cartTotalAmount = useSelector((state) => state.Cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.Cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.Cart.items[key].productTitle,
        productPrice: state.Cart.items[key].productPrice,
        quantity: state.Cart.items[key].quantity,
        sum: state.Cart.items[key].sum,
      });
    }
    return transformedCartItems;
  });
  const dispatch = useDispatch();
  const CartScreen = () => {
    return (
      <View style={styles.container}>
        <View style={styles.summery}>
          <Text style={styles.summeryText}>
            Total:
            <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
          </Text>
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
          />
        </View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemdata) => (
            <CartItem
              item={itemdata.item}
              onRemove={() => {
                dispatch(remove_from_cart(itemdata.item.productId));
              }}
            />
          )}
        />
      </View>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerTitle: "Cart",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

export default CartStackScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  summery: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    elevation: 15,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
  summeryText: {
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
