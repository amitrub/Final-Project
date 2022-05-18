import React, { useCallback } from "react";
import { View, SafeAreaView, ScrollView, TextInput } from "react-native";
import Log from "../../constants/logger";
import RegisterUser from "../../Entities/Users/RegisterUser";
import Address from "../../Entities/Users/Address";
import { RegisterPageStyles } from "../../styles/styles";
import { registerUserRequest } from "../../api/RegisterPage/RegisterPageApi";
import TitleButton from "../../components/basicComponents/buttons/TitleButton";

const RegisterPage = (props) => {
  Log.info("Register Page >> loading");
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
    registerUserRequest(user, emptyRegisterInputs, props.navigation)
      .then((r) => r)
      .catch((e) => console.log(e));
  }, [email, password, fullName, phone, city, country, number, street]);

  return (
    <SafeAreaView style={RegisterPageStyles.screen}>
      <ScrollView>
        <View>
          <View style={{ paddingTop: 60, paddingBottom: 30 }}>
            <TextInput
              style={RegisterPageStyles.input}
              onChangeText={setEmail}
              value={email}
              placeholder={"Email address"}
            />
            <TextInput
              style={RegisterPageStyles.input}
              onChangeText={setFullName}
              value={fullName}
              placeholder={"Full Name"}
            />
            <TextInput
              style={RegisterPageStyles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="password"
            />
            <TextInput
              style={RegisterPageStyles.input}
              onChangeText={setPhone}
              value={phone}
              placeholder={"Phone Number"}
            />
            <TextInput
              style={RegisterPageStyles.input}
              onChangeText={setCountry}
              value={country}
              placeholder={"Country"}
            />
            <TextInput
              style={RegisterPageStyles.input}
              onChangeText={setCity}
              value={city}
              placeholder={"City"}
            />
            <TextInput
              style={RegisterPageStyles.input}
              onChangeText={setStreet}
              value={street}
              placeholder={"Street"}
            />
            <TextInput
              style={RegisterPageStyles.input}
              onChangeText={setNumber}
              value={number.toString()}
              placeholder="number"
              keyboardType="numeric"
            />
          </View>

          <TitleButton text={"Sign Up"} onPress={onPressRegister} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterPage;
