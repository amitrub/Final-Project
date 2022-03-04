import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import Colors from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../store/actions/users";

const RegisterInput = (props) => {
  const [email, setEmail] = React.useState("emailTest");
  const [password, setPassword] = React.useState("passTest");
  const [fullName, setFullName] = React.useState("nameTest");
  const [phone, setPhone] = React.useState("phoneTest");
  const [city, setCity] = React.useState("cityTest");
  const [country, setCountry] = React.useState("countryTest");
  const [number, setNumber] = React.useState(1);
  const [street, setStreet] = React.useState("streetTest");

  const emptyRegisterInputs = () => {
    setEmail("emailTest");
    setPassword("passTest");
    setFullName("nameTest");
    setPhone("phoneTest");
    setCity("cityTest");
    setCountry("countryTest");
    setStreet("streetTest");
    // setEmail("");
    // setPassword("");
    // setFullName("");
    // setPhone("");
    // setCity("");
    // setCountry("");
    // setStreet("");
  };
  const registeredUsers = useSelector((state) => state["users"].registered);
  const createOneButtonAlert = (message) =>
    Alert.alert("Event manager app", message, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const dispatch = useDispatch();
  const onPressRegister = useCallback(async () => {
    await dispatch(
      await userActions.registerApi(
        fullName,
        email,
        password,
        phone,
        country,
        city,
        street,
        number
      )
    );
    emptyRegisterInputs();
    //todo: need to get a response and decide about the message!
    createOneButtonAlert("You have successfully registered!\nplease SIGN IN");
  }, [
    dispatch,
    fullName,
    email,
    password,
    phone,
    country,
    city,
    street,
    number,
  ]);

  return (
    <View>
      <View style={{ paddingTop: "15%" }}>
        <Text style={styles.mainTitle}>SIGN UP</Text>
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
          onChangeText={setFullName}
          value={fullName}
          placeholder={"Full Name"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPhone}
          value={phone}
          placeholder={"Phone Number"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setCountry}
          value={country}
          placeholder={"Country"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setCity}
          value={city}
          placeholder={"City"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setStreet}
          value={street}
          placeholder={"Street"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setNumber}
          value={number}
          placeholder="number"
          keyboardType="numeric"
        />
      </SafeAreaView>

      <Button
        onPress={onPressRegister}
        title="Register"
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
