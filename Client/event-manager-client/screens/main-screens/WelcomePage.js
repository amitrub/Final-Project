import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import TitleButton from "../../components/basicComponents/buttons/TitleButton";
import LogoImage from "../../components/basicComponents/WelcomePage/LogoImage";
import Colors from "../../constants/colors";
import Log from "../../constants/logger";
import LoginInput from "../../components/basicComponents/RegisterPage/LoginInput";

const WelcomePage = (props) => {
  Log.info("Welcome Page >> loading");
  const [isLogin, setIsLogin] = useState(false);

  const onPressRegister = () => {
    props.navigation.navigate("Register");
  };
  const onPressLogin = () => {
    setIsLogin(!isLogin);
  };

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
              <TitleButton text={"Login"} onPress={onPressLogin} />
              <TitleButton text={"Register"} onPress={onPressRegister} />
              <TitleButton
                text={"Sign-in with Google"}
                onPress={onPressRegister}
              />
            </View>
          </View>
        ) : (
          <LoginInput onLogin={onPressLogin} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
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
