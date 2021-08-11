import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemData}>
        <Text style={styles.quaenty}>{props.item.quantity}</Text>
        <Text style={styles.title}>{props.item.productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.Amount}>${props.item.sum.toFixed(2)}</Text>
        <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  itemData: {
    flexDirection: "column",
    alignContent: "center",
  },
  quaenty: {
    color: "#888",
    fontSize: 16,
  },
  title: {
    fontSize: 16,
  },
  Amount: {
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});
