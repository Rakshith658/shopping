import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../constant/Colors";
import { useSelector, useDispatch } from "react-redux";
import { create_item, update_item } from "../../store/action/Products";
import Inpute from "../../components/UI/Inpute";

const Stack = createStackNavigator();

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditeProductsStackScreen = ({ navigation, route }) => {
  const EditeProductsScreen = () => {
    const [isloading, setIsloading] = useState(false);
    const [Error, setError] = useState();
    const userId = route.params?.productId;
    const userProducts = useSelector((state) => state.Product.userProducts);
    const dispatch = useDispatch();
    const editedProduct = userProducts.find((P) => P.id === userId);

    const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
        title: editedProduct ? editedProduct.title : "",
        imageUrl: editedProduct ? editedProduct.imageUrl : "",
        description: editedProduct ? editedProduct.description : "",
        price: "",
      },
      inputValidities: {
        title: editedProduct ? true : false,
        imageUrl: editedProduct ? true : false,
        description: editedProduct ? true : false,
        price: editedProduct ? true : false,
      },
      formIsValid: editedProduct ? true : false,
    });

    useEffect(() => {
      if (Error) {
        Alert.alert("something went wrong!", Error, [{ text: "Okay" }]);
      }
    }, [Error]);

    const HandeleSubmitte = async () => {
      if (!formState.formIsValid) {
        Alert.alert("Wrong input!", "Please check the errors in the form.", [
          { text: "Okay" },
        ]);
        return;
      }
      setError(null);
      setIsloading(true);
      try {
        if (editedProduct) {
          await dispatch(
            update_item(
              userId,
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl
            )
          );
        } else {
          await dispatch(
            create_item(
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl,
              +formState.inputValues.price
            )
          );
        }
        navigation.goBack();
      } catch (error) {
        setError(error.message);
      }
      setIsloading(false);
    };

    const InputChangeHandler = useCallback(
      (inputIdentifier, value, isValid) => {
        dispatchFormState({
          type: FORM_INPUT_UPDATE,
          value: value,
          isValid: isValid,
          input: inputIdentifier,
        });
      },
      [dispatchFormState]
    );

    if (isloading) {
      return (
        <View style={styles.containerCenter}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={1}
      >
        <ScrollView>
          <View style={styles.container}>
            <Inpute
              id="title"
              label="Title"
              errorText="Please enter a valid title"
              keyboardType="default"
              autoCorrect
              autoCapitalize="sentences"
              returnKeyType="next"
              onInputChange={InputChangeHandler}
              initialvalue={editedProduct ? editedProduct.title : ""}
              initiallyValid={!!editedProduct}
              required
            />
            <Inpute
              id="imageUrl"
              label="ImageUrl"
              errorText="Please enter a valid ImageUrl"
              keyboardType="default"
              returnKeyType="next"
              onInputChange={InputChangeHandler}
              initialvalue={editedProduct ? editedProduct.imageUrl : ""}
              initiallyValid={!!editedProduct}
              required
            />
            {editedProduct?.price ? (
              <View />
            ) : (
              <Inpute
                id="price"
                label="Price"
                errorText="Please enter a valid Price"
                keyboardType="decimal-pad"
                returnKeyType="next"
                onInputChange={InputChangeHandler}
                required
                min={0.1}
              />
            )}
            <Inpute
              id="description"
              label="Description"
              errorText="Please enter a valid description"
              keyboardType="default"
              autoCapitalize="sentences"
              multiline
              autoCorrect
              numberOfLines={3}
              onInputChange={InputChangeHandler}
              initialvalue={editedProduct ? editedProduct.description : ""}
              initiallyValid={!!editedProduct}
              required
              minLength={5}
            />
          </View>
          <View style={styles.buttoncontainer}>
            <Button
              title="Save"
              color={Colors.primary}
              onPress={HandeleSubmitte}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  buttoncontainer: {
    width: "50%",
    alignSelf: "center",
    justifyContent: "center",
  },
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
