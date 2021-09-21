import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";

import { ShopNavigation } from "./ShopNavigation";

const NavigationReset = ({ navigation }) => {
  const isAuth = useSelector((state) => state.auth.token);
  console.log(isAuth);
  useEffect(() => {
    if (isAuth == null) {
      navigation.dispatch(CommonActions.navigate({ name: "Auth" }));
    }
  }, [isAuth]);

  return <ShopNavigation />;
};

export default NavigationReset;
