import React, { useCallback, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import Colors from "../../../constants/colors";
import { base_url, login } from "../../../constants/urls";
import {
  createOneButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../../constants/errorHandler";
import UserAuthentication from "../../../global/UserAuthentication";
import Log from "../../../constants/logger";
import Loader from "../others/Loader";
import ErrorScreen, { ErrorMessages } from "../others/ErrorScreen";
import { useNavigation } from "@react-navigation/native";
import { TabNavigator } from "../../../App";

const LoginInput = (props) => {
  Log.info("LoginInput >> loading");

  const navigation = useNavigation();
  const myContext = useContext(UserAuthentication);
  const [email, setEmail] = React.useState("admin@gmail.com");
  const [password, setPassword] = React.useState("1234");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [googleSubmiting,setGoogleSubmitting] = useState(false);

  const emptyLoginInputs = () => {
    setEmail("");
    setPassword("");
  };
  const createTwoButtonAlert = (props, message) =>
    Alert.alert("Woohoo!", message, [
      {
        text: "OK",
        onPress: () => {
          Log.info("LoginInput >> Redirect to HomePage");
          navigation.navigate(TabNavigator);
          // props.onLogin();
        },
        style: "default",
      },
      {
        text: "Cancel",
        onPress: () => Log.info("Cancel Pressed"),
        style: "destructive",
      },
    ]);

  const onPressLogin = useCallback(async () => {
    Log.info("onPressLogin >> POST Login");
    setIsLoading(true);

    await fetch(
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
      { timeout: 5000 }
    )
      .then(async (res) => {
        const data = await res.json();
        if (STATUS_FAILED(res.status)) {
          const message = data.Error ? data.Error : "";
          createOneButtonAlert(message, "OK", "Login failed");
        } else if (STATUS_SUCCESS(res.status)) {
          const message =
            "You have successfully login!\nGo watch your home page";
          myContext.setToken(data.token);
          myContext.setId(data.id);
          myContext.setName(data.name);
          createTwoButtonAlert(props, message);
          emptyLoginInputs();
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
    <View>
      <View style={{ paddingTop: "50%" }}>
        <Text style={styles.mainTitle}>SIGN IN</Text>
      </View>

      <SafeAreaView>
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

      <View style={styles.row}>
        <Button title="Back" onPress={props.onLogin} color="#841584" />
        <Button
          onPress={onPressLogin}
          title="Login"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    width: 250,
    backgroundColor: Colors.background_gray,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});

export default LoginInput;
