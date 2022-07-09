import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../common/constants/colors";
import Entypo from "react-native-vector-icons/Entypo";

const TitleButton = (props) => {
  const googleIcon = props.isGoogle ? (
    <Entypo name={"google-"} color={Colors.dark_green} size={20} />
  ) : undefined;
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
      }}
    >
      <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.button]}>
          {googleIcon}
          <Text style={styles.buttonText}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: Colors.button_gray,
    height: 48,
    width: 250,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 18,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonText: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 18,
  },
});

export default TitleButton;
