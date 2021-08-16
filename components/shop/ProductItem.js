import React from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import Colors from "../../constant/Colors";

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View>
      <TouchableCmp onPress={props.onViewDetail} useForeground>
        <View style={styles.product}>
          <Image source={{ uri: props.image }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={props.user ? "Edite" : "View Detials"}
              onPress={props.onViewDetail}
              color={Colors.primary}
            />
            <Button
              title={props.user ? "Delete" : "Add Cart"}
              color={Colors.primary}
              onPress={props.onAddToCart}
            />
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "60%",
  },
  title: {
    fontSize: 20,
    margin: 5,
  },
  price: {
    fontSize: 15,
    margin: 5,
    color: "green",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  details: {
    alignItems: "center",
  },
});
