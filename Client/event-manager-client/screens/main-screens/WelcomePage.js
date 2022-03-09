import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RegisterButton from "../../components/basicComponents/WelcomePage/RegisterButton";
import LogoImage from "../../components/basicComponents/WelcomePage/LogoImage";
import Colors from "../../constants/colors";

const WelcomePage = (props) => {
  return (
    <View style={styles.screen}>
      <View style={{ paddingTop: "10%" }}>
        <LogoImage />
      </View>

      <View style={{ paddingTop: "15%" }}>
        <Text style={styles.mainTitle}>ONE APP SHOW</Text>
      </View>

      <View style={{ paddingTop: "25%" }}>
        <RegisterButton
          text={"Register with Google"}
          navi={props.navigation}
          navToPage={"Register"}
        />
        <RegisterButton
          text={"Register / Login"}
          navi={props.navigation}
          navToPage={"Register"}
        />
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
