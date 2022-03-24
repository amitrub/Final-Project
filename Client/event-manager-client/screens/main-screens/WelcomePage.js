import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import TitleButton from "../../components/basicComponents/buttons/TitleButton";
import LogoImage from "../../components/basicComponents/WelcomePage/LogoImage";
import Colors from "../../constants/colors";
import Log from "../../constants/logger";
import LoginInput from "../../components/basicComponents/RegisterPage/LoginInput";

const WelcomePage = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  Log.info("Welcome Page >> loading");
  return (
    <ScrollView>
      <View style={styles.screen}>
        {!isLogin ? (
          <View>
            <View style={{ paddingTop: "10%" }}>
              <LogoImage />
            </View>

            <View style={{ paddingTop: "15%" }}>
              <Text style={styles.mainTitle}>ONE APP SHOW</Text>
            </View>

            <View style={{ paddingTop: "15%" }}>
              <TitleButton
                text={"Login"}
                onPress={() => setIsLogin(!isLogin)}
              />
              <TitleButton
                text={"Register"}
                onPress={() => props.navigation.navigate("Register")}
              />
              <TitleButton
                text={"Sign in with Google"}
                onPress={() => props.navigation.navigate("Register")}
              />
            </View>
          </View>
        ) : (
          <LoginInput
            navi={props.navigation}
            onLogin={() => setIsLogin(!isLogin)}
          />
        )}
      </View>
    </ScrollView>
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
