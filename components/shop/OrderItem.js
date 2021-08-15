import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Colors from "../../constant/Colors";
import CartItem from "./CartItem";

const OrderItem = (props) => {
  const [showDeatils, setshowDeatils] = useState(false);
  return (
    <View style={styles.orderContainer}>
      <View style={styles.summery}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.data}>{props.readabledate}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={showDeatils ? "Hide Deatils " : "show Deatils"}
          color={Colors.primary}
          onPress={() => setshowDeatils(!showDeatils)}
        />
      </View>
      {showDeatils && (
        <View>
          {props.item.map((cartitem) => (
            <View key={cartitem.productId}>
              <CartItem item={cartitem} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderContainer: {
    margin: 20,
    padding: 10,
    marginBottom: 20,
    padding: 10,
    elevation: 15,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
  summery: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  totalAmount: {
    fontSize: 18,
    color: Colors.primary,
  },
  data: {
    fontSize: 16,
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
