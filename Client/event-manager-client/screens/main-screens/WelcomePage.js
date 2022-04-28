import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import TitleButton from "../../components/basicComponents/buttons/TitleButton";
import LogoImage from "../../components/basicComponents/WelcomePage/LogoImage";
import Log from "../../constants/logger";
import LoginInput from "../../components/basicComponents/RegisterPage/LoginInput";
import {WelcomePageStyles} from "../../Styles/styles";
import * as Google from 'expo-google-app-auth';

const WelcomePage = (props) => {
  Log.info("Welcome Page >> loading");
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginGoogle, setIsLoginGoogle] = useState(false)

  const onPressRegister = () => {
    props.navigation.navigate("Register");
  };

  const SignIngoogle = () => {
    const config = {
      iosClientId: '281217241179-9vvln5etsdo6k1tq26ajbka5tsqhucr9.apps.googleusercontent.com',
      androidClientId: '281217241179-0l1u9546ujv8qkkd7khflc262cutcl2a.apps.googleusercontent.com',
      scopes:['profile','email']
    };

    Google
        .logInAsync(config)
        .then((result)=>
        {
          console.log(result)
          const{type,user} = result;
          if(type==='success'){
            setIsLoginGoogle(!isLoginGoogle);
            const {email,name,photourl} = user;
            setTimeout(() => props.navigation.navigate("Welcome"), {email,name, photourl},1000)
            props.navigation.navigate("Welcome");
          }
          else {
            console.log("error");
          }
        })
        .catch(error => {
          console.log(error);
        })
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
                onPress={SignIngoogle}
              />
              <TitleButton
                  text={"Reut"}
                  onPress={SignIngoogle}
              />
            </View>
          </View>
        ) : (
          <LoginInput onLogin={SignIngoogle} />
        )}
      </View>
    </ScrollView>
  );
};

export default WelcomePage;
