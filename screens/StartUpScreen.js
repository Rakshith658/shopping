import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constant/Colors";
import { useDispatch } from "react-redux";
import { authentication } from "../store/action/Auth";

const StartUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        navigation.replace("Auth");
        return;
      }
      const tranformdata = JSON.parse(userData);
      const { token, userId, expiryDate } = tranformdata;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        navigation.replace("Auth");
        return;
      }

      const expiryTime = expirationDate.getTime - new Date().getTime();
      navigation.replace("Home");
      dispatch(authentication(userId, token, expiryTime));
    };
    tryLogin();
  }, [dispatch]);
  return (
    <View style={styles.containerCenter}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartUpScreen;

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
