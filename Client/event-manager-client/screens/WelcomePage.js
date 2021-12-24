import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/basicComponents/WelcomePage/Button";
import LogoImage from "../components/basicComponents/WelcomePage/LogoImage";
import Colors from "../constants/colors";

const WelcomePage = () => {
  return (
    <View style={styles.screen}>
      <View style={{ paddingTop: "20%" }}>
        <LogoImage />
      </View>

      <View style={{ paddingTop: "15%" }}>
        <Text style={styles.mainTitle}>ONE APP SHOW</Text>
      </View>

      <View style={{ paddingTop: "25%" }}>
        <Button text={"Register with Google"} />
        <Button text={"Register"} />
      </View>
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

export default WelcomePage;
