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
import { base_url, register } from "../../../constants/urls";
import RegisterUser from "../../../Entities/Users/RegisterUser";
import Address from "../../../Entities/Users/Address";
import {
  createOneButtonAlert,
  handleResponseRegister,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../../constants/errorHandler";
import UserAuthentication from "../../../global/UserAuthentication";
import Log from "../../../constants/logger";

const RegisterInput = (props) => {
  const myContext = useContext(UserAuthentication);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("phoneTest");
  const [city, setCity] = React.useState("cityTest");
  const [country, setCountry] = React.useState("countryTest");
  const [number, setNumber] = React.useState(1);
  const [street, setStreet] = React.useState("streetTest");

  const emptyRegisterInputs = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setPhone("");
    setCity("");
    setCountry("");
    setStreet("");
  };

  const onPressRegister = useCallback(async () => {
    const user = new RegisterUser(
      fullName,
      email,
      password,
      phone,
      new Address(country, city, street, number)
    );
    Log.info("onPressRegister >> POST Register");

    await fetch(
      base_url + register,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      },
      { timeout: 2000 }
    )
      .then(async (res) => {
        const data = await res.json();
        if (STATUS_FAILED(res.status)) {
          const message = data.Error ? data.Error : "";
          createOneButtonAlert(message, "OK", "Registration Failed");
        } else if (STATUS_SUCCESS(res.status)) {
          const message = "You have successfully registered!\nplease LOGIN";
          createOneButtonAlert(message, "OK", "Registration Succeeded");
          emptyRegisterInputs();
        }
      })
      .catch((error) => {
        createOneButtonAlert("Server is soooo slow, you should check it...");
        Log.error("onPressRegister error", error);
      });
  }, [email, password, fullName, phone, city, country, number, street]);

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
          value={number.toString()}
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
