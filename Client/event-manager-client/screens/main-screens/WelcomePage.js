import React, { useCallback, useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import TitleButton from "../../components/basicComponents/buttons/TitleButton";
import LogoImage from "../../components/basicComponents/WelcomePage/LogoImage";
import Log from "../../constants/logger";
import { WelcomePageStyles as styles } from "../../Styles/styles";
import Loader from "../../components/basicComponents/others/Loader";
import ErrorScreen, {
  ErrorMessages,
} from "../../components/basicComponents/others/ErrorScreen";
import { useNavigation } from "@react-navigation/native";
import UserAuthentication from "../../global/UserAuthentication";
import fetchTimeout from "fetch-timeout";
import { base_url, login } from "../../constants/urls";
import {
  createOneButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../constants/errorHandler";
import Colors from "../../constants/colors";
import { TabNavigator } from "../../App";

const WelcomePage = (props) => {
  Log.info("Welcome Page >> loading");
  const navigation = useNavigation();
  const myContext = useContext(UserAuthentication);
  const [email, setEmail] = React.useState("admin@gmail.com");
  const [password, setPassword] = React.useState("1234");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onPressRegister = () => {
    props.navigation.navigate("Register");
  };
  const emptyLoginInputs = () => {
    setEmail("");
    setPassword("");
  };
  const onPressLogin = useCallback(async () => {
    Log.info("onPressLogin >> POST Login");
    setIsLoading(true);

    await fetchTimeout(
      base_url + login,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      },
      5000,
      "Timeout"
    )
      .then(async (res) => {
        const data = await res.json();
        if (STATUS_FAILED(res.status)) {
          const message = data.Error ? data.Error : "data.Error";
          createOneButtonAlert(message, "OK", "Login failed");
        } else if (STATUS_SUCCESS(res.status)) {
          myContext.setToken(data.token);
          myContext.setId(data.id);
          myContext.setName(data.name);
          emptyLoginInputs();
          navigation.navigate(TabNavigator);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        Log.error("onPressLogin error", err);
      });
  }, [email, password]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.Fetching} />;

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View>
          <View style={{ paddingTop: "10%" }}>
            <LogoImage />
          </View>

          <View style={{ paddingTop: "15%" }}>
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
              />
            </SafeAreaView>
            <View style={{ paddingTop: 20 }}>
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
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default WelcomePage;
