import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../constant/Colors";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import { fetch_Order } from "../../store/action/Orders";

const Stack = createStackNavigator();

const OrdersStackScreen = ({ navigation }) => {
  const Order = useSelector((state) => state.Order.order);
  const [refreshing, setrefreshing] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState(false);

  const dispatch = useDispatch();
  const ProcessFetch = async () => {
    setrefreshing(true);
    dispatch(fetch_Order())
      .then(() => setrefreshing(false))
      .catch(() => seterror(true));
  };
  useEffect(() => {
    setisloading(true);
    ProcessFetch().then(() => setisloading(false));
  }, [dispatch]);

  const OrdersScreen = () => {
    if (isloading) {
      return (
        <View style={styles.container_center}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.container_center}>
          <Text style={{ marginBottom: 10 }}>the error occurred !</Text>
          <Button
            title="Try Again !"
            onPress={ProcessFetch}
            color={Colors.primary}
          />
        </View>
      );
    }
    return (
      <FlatList
        onRefresh={ProcessFetch}
        refreshing={refreshing}
        data={Order}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => (
          <OrderItem
            amount={item.item.totalAmount}
            readabledate={item.item.readabledate}
            item={item.item.items}
          />
        )}
      />
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{
          headerTitle: "All Orders",
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
        }}
      />
    </Stack.Navigator>
  );
};

export default OrdersStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container_center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
