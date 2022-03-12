import React, { useCallback, useContext } from "react";
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

const RegisterInput = (props) => {
  const myContext = useContext(UserAuthentication);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const emptyLoginInputs = () => {
    setEmail("");
    setPassword("");
  };
  const createTwoButtonAlert = (props, message) =>
    Alert.alert("You are almost there!", message, [
      {
        text: "OK",
        onPress: () => {
          props.navi.navigate("HomePage");
        },
      },
      { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
    ]);

  const onPressLogin = useCallback(async () => {
    await fetch(
      base_url + login,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      },
      {
        timeout: 2000,
      }
    )
      .then(async (res) => {
        const data = await res.json();
        if (STATUS_FAILED(res.status)) {
          const message = data.Error ? data.Error : "";
          createOneButtonAlert(message, "OK", "Login failed");
        } else if (STATUS_SUCCESS(res.status)) {
          const message =
            "You have successfully login!\npress OK to your home page";
          myContext.setToken(data.token);
          myContext.setId(data.id);
          myContext.setName(data.name);
          createTwoButtonAlert(props, message);
          emptyLoginInputs();
        }
      })
      .catch((error) => console.log("onPressRegister error", error));
  }, [email, password]);

  return (
    <View>
      <View style={{ paddingTop: "5%" }}>
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

      <Button
        onPress={onPressLogin}
        title="Login"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
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
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
});

export default RegisterInput;
