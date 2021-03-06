import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../../common/constants/colors";
import { useNavigation } from "@react-navigation/native";

const SupplierItem = (props) => {
  const navigation = useNavigation();
  const supplier = props.supplier;
  const itemColorStyle = supplier.has_paid
    ? { backgroundColor: Colors.darkseagreen }
    : { backgroundColor: Colors.button_gray };

  return (
    <TouchableOpacity
      style={[styles.listItem, itemColorStyle]}
      onPress={() => {
        navigation.navigate("SupplierPage", {
          eventId: props.eventId,
          supplierId: supplier.id,
        });
      }}
    >
      <View>
        <Text style={styles.text}>
          {supplier.has_paid ? "Paid!" : supplier.price}
        </Text>
        <Text style={styles.text}>{supplier.name}</Text>
      </View>
      <Text style={styles.text}>{supplier.job}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 6,
    backgroundColor: Colors.button_gray,
    borderRadius: 18,
    height: 60,
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 0,
    display: "flex",
  },
  text: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "left",
  },
});

export default SupplierItem;
