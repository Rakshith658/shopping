import React, { useCallback, useReducer, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Text,
} from "react-native";
import Inpute from "../../components/UI/Inpute";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constant/Colors";
import { useDispatch } from "react-redux";
import { signin, signup } from "../../store/action/Auth";

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

const AuthScreen = ({ navigation }) => {
  const AuthScreensub = () => {
    const [isloading, setIsloading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [iserror, setiserror] = useState(false);
    const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
        email: "",
        password: "",
      },
      inputValidities: {
        email: false,
        password: false,
      },
      formIsValid: false,
    });
    const dispatch = useDispatch();

    const AuthHandler = async () => {
      setIsloading(true);
      try {
        if (isSignup) {
          await dispatch(
            signup(formState.inputValues.email, formState.inputValues.password)
          );
        } else {
          await dispatch(
            signin(formState.inputValues.email, formState.inputValues.password)
          );
        }
        navigation.replace("Home");
      } catch (error) {
        setiserror(true);
        setIsloading(false);
      }
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

    if (iserror) {
      return (
        <View style={styles.container}>
          <Text style={{ marginBottom: 10 }}>the error occurred !</Text>
          <Button
            title="Try Again !"
            onPress={() => setiserror(false)}
            color={Colors.primary}
          />
        </View>
      );
    }
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={50} style={styles.screen}>
        <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
          <View style={styles.authContainer}>
            <ScrollView>
              <Inpute
                id="email"
                label="E-Mail"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address."
                onInputChange={InputChangeHandler}
                initialValue=""
              />
              <Inpute
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Please enter a valid password."
                onInputChange={InputChangeHandler}
                initialValue=""
              />
              <View style={styles.buttonContainer}>
                {isloading ? (
                  <View style={styles.container}>
                    <ActivityIndicator size="small" color={Colors.primary} />
                  </View>
                ) : (
                  <Button
                    title={isSignup ? "Sign Up" : "Login"}
                    color={Colors.primary}
                    onPress={AuthHandler}
                  />
                )}
              </View>
              <View style={styles.buttonContainer}>
                {isloading ? (
                  <View style={styles.container}>
                    <ActivityIndicator size="small" color={Colors.primary} />
                  </View>
                ) : (
                  <Button
                    title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                    color={Colors.accent}
                    onPress={() => setIsSignup(!isSignup)}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreensub}
        options={{
          headerTitle: "AuthScreen",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
