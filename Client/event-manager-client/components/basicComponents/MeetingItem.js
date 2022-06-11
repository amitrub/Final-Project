import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/colors";

const MeetingItem = (props) => (
  <TouchableOpacity style={styles.listItem}>
    <View>
      <Text style={styles.textTitle}>{props.description}</Text>
      <Text style={styles.text}>{props.eventName}</Text>
    </View>
    <View>
      <Text style={styles.text}>{props.time}</Text>
      <Text style={styles.text}>{props.date}</Text>
    </View>
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 0,
    display: "flex",
  },
  textTitle: {
    fontFamily: "alef-bold",
    fontSize: 18,
    textAlign: "left",
  },
  text: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "left",
  },
});
export default MeetingItem;
