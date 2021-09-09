import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../constant/Colors";
import ProductItem from "../../components/shop/ProductItem";
import * as cartAction from "../../store/action/Cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { fetchProduct } from "../../store/action/Products";

const Stack = createStackNavigator();

const ProductsOVStackScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const ProductsOVScreen = () => {
    const [isloading, setIsloading] = useState(false);
    const [refreshing, setrefreshing] = useState(false);
    const [iserror, setiserror] = useState(null);

    const loadedProduct = useCallback(async () => {
      setiserror(null);
      setrefreshing(true);
      try {
        await dispatch(fetchProduct());
      } catch (error) {
        setiserror(error.message);
      }
      setrefreshing(false);
    }, [dispatch, setIsloading, setiserror]);

    useEffect(() => {
      setIsloading(true);
      loadedProduct().then(() => setIsloading(false));
    }, [dispatch, loadedProduct]);

    const Product = useSelector((state) => state.Product.availableProducts);

    if (isloading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
    if (iserror) {
      return (
        <View style={styles.container}>
          <Text style={{ marginBottom: 10 }}>the error occurred !</Text>
          <Button
            title="Try Again !"
            onPress={loadedProduct}
            color={Colors.primary}
          />
        </View>
      );
    }
    if (!isloading && Product.length === 0) {
      return (
        <View style={styles.container}>
          <Text>No Product Available , Maybe start adding products</Text>
        </View>
      );
    }

    return (
      <FlatList
        onRefresh={loadedProduct}
        refreshing={refreshing}
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

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
