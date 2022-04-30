import React, {useContext, useState} from "react";
import { View, Text, ScrollView } from "react-native";
import TitleButton from "../../components/basicComponents/buttons/TitleButton";
import LogoImage from "../../components/basicComponents/WelcomePage/LogoImage";
import Log from "../../constants/logger";
import LoginInput from "../../components/basicComponents/RegisterPage/LoginInput";
import { WelcomePageStyles } from "../../Styles/styles";
// import * as Google from 'expo-google-app-auth';
import * as Google from 'expo-google-app-auth';
import axios from "axios";
import UserAuthentication from "../../global/UserAuthentication";
import {useNavigation} from "@react-navigation/native";

const WelcomePage = (props) => {
  Log.info("Welcome Page >> loading");
  const [isLogin, setIsLogin] = useState(false);
  const myContext = useContext(UserAuthentication);
  const onPressRegister = () => {
    props.navigation.navigate("Register");
  };

  const CalenderGoogle = () => {
    props.navigation.navigate("Calender");
  };

  const onPressLogin = () => {
    setIsLogin(!isLogin);
  };

  const SignInGoogle = async () => {
    // const config = {
    //   iosClientId: '281217241179-9vvln5etsdo6k1tq26ajbka5tsqhucr9.apps.googleusercontent.com',
    //   androidClientId: '281217241179-0l1u9546ujv8qkkd7khflc262cutcl2a.apps.googleusercontent.com',
    //   scopes: ['profile', 'email', 'password']
    // };

    const config = {
      iosClientId: '778478932854-ikdla5g4ui7m5l4kldpnoi5s41h4vsab.apps.googleusercontent.com',
      androidClientId: '778478932854-87k01g95uoenf62miqepo97nmv5d9au6.apps.googleusercontent.com',
      scopes: [
          // 'profile',
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email',
          // 'https://www.googleapis.com/auth/user.birthday.read',
          // 'https://www.googleapis.com/auth/user.addresses.read',
          // 'https://www.googleapis.com/auth/user.gender.read',
          // 'https://www.googleapis.com/auth/user.phonenumbers.read',
          // 'https://www.googleapis.com/auth/contacts.readonly',
          'https://www.googleapis.com/auth/calendar.readonly'
          // 'email'
      ]
    };
    const {accessToken, idToken, refreshToken, type, user} = await Google.logInAsync(config);
    console.log(accessToken);
    console.log(idToken);
    console.log(refreshToken);
    console.log(type);
    console.log(user);
    console.log("-----------");
    await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
    // await fetch('https://www.googleapis.com/userinfo/v2/me', {
    // await fetch('https://people.googleapis.com/v1/people/me', {
    // await fetch('https://people.googleapis.com/v1/people/me?personFields=birthdays,addresses,phoneNumbers,genders', {
      method: "GET",
      headers: {Authorization: `Bearer ${accessToken}`},
    }).then(async (res) =>{
      const data = await res.json();
      myContext.setIsGoogle(true);
      myContext.setAccessToken(accessToken);
      myContext.setEmail(user.email)
      console.log(data)
    });
    // if (type === 'success') {
    //   // Then you can use the Google REST API
    //   let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    //     headers: {Authorization: `Bearer ${accessToken}`},
    //   });
    //   console.log("----------------------------")
    //   console.log(type)
    //   console.log(accessToken)
    //   console.log(user)
    // }

    // Google
    //     .logInAsync(config)
    //     .then((result)=>
    //     {
    //       console.log(result)
    //       // const{type,user} = result;
    //       // if(type==='success'){
    //       //   setIsLoginGoogle(!isLoginGoogle);
    //       //   const {email,name,photourl} = user;
    //       //   setTimeout(() => props.navigation.navigate("Welcome"), {email,name, photourl},1000)
    //       //   props.navigation.navigate("Welcome");
    //       // }
    //       // else {
    //       //   console.log("error");
    //       // }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     })
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
                  onPress={SignInGoogle}
              />
              <TitleButton
                  text={"Google Calender"}
                  onPress={CalenderGoogle}
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
