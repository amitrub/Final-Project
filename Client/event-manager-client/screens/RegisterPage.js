import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  SafeAreaView,
} from "react-native";
import Colors from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";
import * as userActions from "../store/actions/users";

const RegisterPage = (props) => {
  const [emailRegister, setEmailRegister] = React.useState("");
  const [passwordRegister, setPasswordRegister] = React.useState("");
  const [nameRegister, setNameRegister] = React.useState("");
  const [phoneRegister, setPhoneRegister] = React.useState("");

  const [emailLogin, setEmailLogin] = React.useState("");
  const [passwordLogin, setPasswordLogin] = React.useState("");

  const registeredUsers = useSelector((state) => state["users"].registered);

  const dispatch = useDispatch();
  const onPressRegister = useCallback(async () => {
    debugger;
    console.log("enter to onPressRegister");

    await dispatch(
      await userActions.registerApi(
        nameRegister,
        emailRegister,
        passwordRegister,
        phoneRegister
      )
    );
    console.log("back to onPressRegister");
    //Cant jump with stack navigator after dispatch
    //props.navigation.navigate("HomePage");
  }, [dispatch, nameRegister, emailRegister, passwordRegister, phoneRegister]);

  const onPressLogin = () => {
    console.log("onPressLogin");
    props.navigation.navigate("HomePage");
  };

  return (
    <View style={styles.screen}>
      {/**** Extract RegisterInput Component ****/}
      <View style={{ paddingTop: "15%" }}>
        <Text style={styles.mainTitle}>REGISTER</Text>
      </View>

      <Text>{JSON.stringify(registeredUsers)}</Text>

      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setEmailRegister}
          value={emailRegister}
          placeholder={"Email address"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setNameRegister}
          value={nameRegister}
          placeholder={"Full Name"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPasswordRegister}
          value={passwordRegister}
          placeholder="password"
          // keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPhoneRegister}
          value={phoneRegister}
          placeholder={"Phone Number"}
        />
      </SafeAreaView>

      <Button
        onPress={onPressRegister}
        title="Register"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      {/**** end RegisterInput Component ****/}

      {/**** Extract LoginInput Component ****/}
      <View style={{ paddingTop: "15%" }}>
        <Text>Have you register before?</Text>
      </View>

      <View style={{ paddingTop: "5%" }}>
        <Text style={styles.mainTitle}>Login</Text>
      </View>

      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setEmailLogin}
          value={emailLogin}
          placeholder={"Email address"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPasswordLogin}
          value={passwordLogin}
          placeholder="password"
          // keyboardType="numeric"
        />
      </SafeAreaView>

      <Button
        onPress={onPressLogin}
        title="Login"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      {/**** end LoginInput Component ****/}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
});

export default RegisterPage;
