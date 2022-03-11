import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/colors";

const MeetingItem = (props) => (
  <TouchableOpacity style={styles.listItem}>
    <Text style={styles.textTitle}>
      {props.time} {props.location}
    </Text>
    <Text style={styles.textDesc}>{props.description}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 6,
    backgroundColor: Colors.button_gray,
    borderRadius: 18,
    height: 60,
    width: 300,
    justifyContent: "center",
  },
  textTitle: {
    fontFamily: "alef-bold",
    fontSize: 18,
    textAlign: "left",
  },
  textDesc: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "left",
  },
});
export default MeetingItem;
