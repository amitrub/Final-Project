import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

const BodyText = (props) => (
  <View>
    <Text>{props.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  // button: {
  //   padding: 10,
  //   marginVertical: 10,
  //   backgroundColor: Colors.button_gray,
  //   // borderColor: "black",
  //   // borderWidth: 1,
  //   borderRadius: 150,
  //   height: 48,
  //   width: 240,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // buttonText: {
  //   color: Colors.text_black,
  //   fontFamily: "alef-bold",
  //   fontSize: 15,
  //  },
});

export default BodyText;
