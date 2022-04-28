import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../constants/colors";

const TitleButton = (props) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
      }}
    >
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.button_gray,
    height: 48,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  buttonText: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 20,
  },
});

export default TitleButton;
