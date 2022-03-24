import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import Colors from "../../../constants/colors";

const TitleButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: Colors.button_gray,
    // borderColor: "black",
    // borderWidth: 1,
    height: 48,
    width: 240,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  buttonText: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 15,
  },
});

export default TitleButton;
