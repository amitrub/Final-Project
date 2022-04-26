import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import TitleButton from "../../components/basicComponents/buttons/TitleButton";
import LogoImage from "../../components/basicComponents/WelcomePage/LogoImage";
import Log from "../../constants/logger";
import LoginInput from "../../components/basicComponents/RegisterPage/LoginInput";
import {WelcomePageStyles} from "../../Styles/styles";

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
      <View style={WelcomePageStyles.screen}>
        {!isLogin ? (
          <View>
            <View style={{ paddingTop: "10%" }}>
              <LogoImage />
            </View>

            <View style={{ paddingTop: "15%" }}>
              <Text style={WelcomePageStyles.mainTitle}>ONE APP SHOW</Text>
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

export default WelcomePage;
