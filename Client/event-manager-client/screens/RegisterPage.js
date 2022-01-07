import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Colors from "../constants/colors";

const RegisterPage = (props) => {
  //console.log(props);
  return (
    <View style={styles.screen}>
      <View style={{ paddingTop: "15%" }}>
        <Text style={styles.mainTitle}>REGISTER</Text>
      </View>

      <Button
        title={"Go back"}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
  },
});

export default RegisterPage;
