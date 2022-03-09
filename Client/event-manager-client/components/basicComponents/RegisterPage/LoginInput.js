import React, { useCallback } from "react";
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
import { useDispatch } from "react-redux";
import * as userActions from "../../../store/actions/users";

const RegisterInput = (props) => {
  const [email, setEmail] = React.useState("emailTest");
  const [password, setPassword] = React.useState("passTest");

  const emptyLoginInputs = () => {
    setEmail("emailTest");
    setPassword("passTest");
    // setEmailLogin("");
    // setPasswordLogin("");
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
  const dispatch = useDispatch();
  const onPressLogin = useCallback(async () => {
    await dispatch(await userActions.loginApi(email, password));
    emptyLoginInputs();
    createTwoButtonAlert(
      props,
      "You have successfully signed in!\npress OK and go to your Home Page"
    );
  }, [dispatch, email, password]);

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
