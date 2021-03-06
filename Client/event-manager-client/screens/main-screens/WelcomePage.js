import React, { useCallback, useContext } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import TitleButton from "../../lindsly-style-react/components/buttons/TitleButton";
import LogoImage from "../../lindsly-style-react/components/logo/LogoImage";
import Log from "../../common/constants/logger";
import * as Google from "expo-google-app-auth";
import { WelcomePageStyles as styles } from "../../lindsly-style-react/styles/styles";
import Loader from "../../lindsly-style-react/components/others/Loader";
import { useNavigation } from "@react-navigation/native";
import UserAuthentication from "../../common/global/UserAuthentication";
import Colors from "../../common/constants/colors";
import {
  useLoginRequest,
  useLoginWithGoogleRequest,
} from "../../common/api/WelcomePage/LoginApi";

const WelcomePage = (props) => {
  const navigation = useNavigation();
  const myContext = useContext(UserAuthentication);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onPressRegister = () => {
    navigation.navigate("RegisterPage");
  };
  const emptyLoginInputs = () => {
    setEmail("");
    setPassword("");
  };
  const onPressLogin = useCallback(async () => {
    Log.info("onPressLogin >> POST Login");
    await useLoginRequest(
      myContext,
      email,
      password,
      navigation,
      emptyLoginInputs
    );
  }, [email, password, myContext.refresh]);
  const onPressSignInGoogle = useCallback(async () => {
    Log.info("onPressSignInGoogle >> POST SignInGoogle");
    const config = {
      iosClientId:
        "778478932854-ikdla5g4ui7m5l4kldpnoi5s41h4vsab.apps.googleusercontent.com",
      androidClientId:
        "778478932854-87k01g95uoenf62miqepo97nmv5d9au6.apps.googleusercontent.com",
      scopes: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        // 'https://www.googleapis.com/auth/user.birthday.read',
        // 'https://www.googleapis.com/auth/user.addresses.read',
        // 'https://www.googleapis.com/auth/user.gender.read',
        // 'https://www.googleapis.com/auth/user.phonenumbers.read',
        // 'https://www.googleapis.com/auth/contacts.readonly',
        // "https://www.googleapis.com/auth/calendar.readonly",
      ],
    };
    const { accessToken, idToken, refreshToken, type, user } =
      await Google.logInAsync(config);
    const googleEmail = user["email"];
    console.log(googleEmail);
    setEmail(googleEmail);
    await useLoginWithGoogleRequest(
      myContext,
      googleEmail,
      accessToken,
      navigation,
      emptyLoginInputs
    );
  }, [email, myContext.refresh]);

  if (myContext.isLoading) return <Loader />;

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View>
          <View style={{ paddingTop: "7%" }}>
            <LogoImage />
          </View>
          <View style={{ paddingTop: "7%" }}>
            <Text style={styles.mainTitle}>ONE APP SHOW</Text>
          </View>
          <View style={{ paddingTop: "7%", paddingBottom: "7%" }}>
            <SafeAreaView style={{ paddingRight: 30, marginBottom: 25 }}>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder={"Email address"}
              />
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="password"
                secureTextEntry={true}
              />
            </SafeAreaView>
            <View>
              <TitleButton text={"Sign In"} onPress={onPressLogin} />
            </View>
            <View style={[styles.row, { paddingTop: 7 }]}>
              <Text style={{ fontSize: 18, color: Colors.dark_gray }}>
                New to EventIt?
              </Text>
              <Pressable onPress={onPressRegister}>
                <Text style={{ fontSize: 20, color: Colors.blueBack }}>
                  Sign Up!
                </Text>
              </Pressable>
            </View>
            <View style={{ paddingTop: 40 }}>
              <TitleButton
                text={"Sign in with Google"}
                onPress={onPressSignInGoogle}
                isGoogle={true}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default WelcomePage;
