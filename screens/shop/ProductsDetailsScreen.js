import React from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../constant/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as cartAction from "../../store/action/Cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const Stack = createStackNavigator();

const ProductsDetailstackScreen = ({ route, navigation }) => {
  const proId = route.params.productId;
  const Prod = useSelector((state) =>
    state.Product.availableProducts.find((p) => p.id === proId)
  );

  const dispatch = useDispatch();
  const ProductsDetailScreen = () => {
    return (
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: Prod.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Add Cart"
            color={Colors.primary}
            onPress={() => {
              dispatch(cartAction.add_to_cart(Prod));
            }}
          />
        </View>
        <Text style={styles.price}>${Prod.price.toFixed(2)}</Text>
        <Text style={styles.description}>{Prod.description}</Text>
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
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName="ios-cart"
                onPress={() => navigation.navigate("Cart")}
              />
            </HeaderButtons>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductsDetailstackScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
  },
  imageContainer: {
    elevation: 15,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
  buttonContainer: {
    alignItems: "center",
  },
  price: {
    fontSize: 15,
    margin: 5,
    color: "green",
    alignSelf: "center",
  },
  description: {
    margin: 20,
    fontSize: 18,
    alignSelf: "center",
  },
});
