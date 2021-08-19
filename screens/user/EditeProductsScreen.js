import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../constant/Colors";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { create_item, update_item } from "../../store/action/Products";

const Stack = createStackNavigator();

const EditeProductsStackScreen = ({ navigation, route }) => {
  const userId = route.params?.productId;
  const userProducts = useSelector((state) => state.Product.userProducts);
  const dispatch = useDispatch();
  const useris = userProducts.find((P) => P.id === userId);

  const [Title, setTitle] = useState(useris ? useris.title : "");
  const [ImageUrl, setImageUrl] = useState(useris ? useris.imageUrl : "");
  const [Price, setPrice] = useState(useris ? useris.price : "");
  const [IsvailedState, setIsvailedState] = useState(false);
  const [Description, setDescription] = useState(
    useris ? useris.description : ""
  );

  const HandeleSubmitte = () => {
    if (!IsvailedState) {
      return;
    }
    if (useris) {
      dispatch(update_item(userId, Title, Description, ImageUrl));
    } else {
      dispatch(create_item(Title, Description, ImageUrl, +Price));
    }
    navigation.goBack();
  };

  const TitleChangeHander = (text) => {
    if (text.trim().length === 0) {
      setIsvailedState(false);
    } else {
      setIsvailedState(true);
    }
    setTitle(text);
  };

  const EditeProductsScreen = () => {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formcontrole}>
            <Text style={styles.title}>Title</Text>
            <TextInput
              style={styles.input}
              value={Title}
              onChange={TitleChangeHander}
              keyboardType="default"
              autoCorrect
            />
            {!IsvailedState && <Text>Please enter vailed title!</Text>}
          </View>
          <View style={styles.formcontrole}>
            <Text style={styles.title}>ImageUrl</Text>
            <TextInput
              style={styles.input}
              value={ImageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              keyboardType="numeric"
            />
          </View>
          {useris?.price ? (
            <View />
          ) : (
            <View style={styles.formcontrole}>
              <Text style={styles.title}>Price</Text>
              <TextInput
                style={styles.input}
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </View>
          )}
          <View style={styles.formcontrole}>
            <Text style={styles.title}>Description</Text>
            <TextInput
              style={styles.input}
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EditeProductsScreen"
        component={EditeProductsScreen}
        options={{
          headerTitle: route.params?.productId
            ? "Edite Product"
            : "Add Product",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: "white",
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="save"
                iconName="ios-checkmark"
                onPress={HandeleSubmitte}
              />
            </HeaderButtons>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default EditeProductsStackScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  formcontrole: {
    width: "100%",
  },
  title: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
