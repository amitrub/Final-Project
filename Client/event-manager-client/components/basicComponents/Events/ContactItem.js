import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../../constants/colors";
import Entypo from "react-native-vector-icons/Entypo";

const ContactItem = (props) => (
  <TouchableOpacity
    style={styles.listItem}
    onPress={() => {
      console.log("Add owner");
    }}
  >
    <Entypo name="user" size={16} />
    <Text style={styles.text}>{props.contact}</Text>
    <Entypo name="plus" size={16} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 6,
    backgroundColor: Colors.button_gray,
    borderRadius: 18,
    height: 40,
    width: 230,
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

export default ContactItem;
