import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import TitleButton from "../../components/basicComponents/buttons/TitleButton";
import LogoImage from "../../components/basicComponents/WelcomePage/LogoImage";
import Colors from "../../constants/colors";
import Log from "../../constants/logger";
import LoginInput from "../../components/basicComponents/RegisterPage/LoginInput";
import * as Google from 'expo-google-app-auth';


const WelcomePage = (props) => {
  Log.info("Welcome Page >> loading");
  const [isLogin, setIsLogin] = useState(false);

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
            const {email,name,photourl} = user;
            setTimeout(() => props.navigation.navigate("Welcome"), {email,name,photourl},1000)
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
