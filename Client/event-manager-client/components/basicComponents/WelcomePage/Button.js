import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../constants/colors";

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("try");
      }}
    >
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
  },
  buttonText: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 15,
  },
});

export default Button;
