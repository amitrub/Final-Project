import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  SafeAreaView,
} from "react-native";
import Colors from "../constants/colors";

const RegisterPage = (props) => {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");

  const onPressRegister = () => {
    console.log("onPressRegister");
    props.navigation.navigate("HomePage");
  };

  const onPressLogin = () => {
    console.log("onPressLogin");
    props.navigation.navigate("HomePage");
  };

  return (
    <View style={styles.screen}>
      <View style={{ paddingTop: "15%" }}>
        <Text style={styles.mainTitle}>REGISTER</Text>
      </View>

      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={() => {}}
          value={text}
          placeholder={"Email address"}
        />
        <TextInput
          style={styles.input}
          onChangeText={() => {}}
          value={number}
          placeholder="password"
          // keyboardType="numeric"
        />
      </SafeAreaView>

      <Button
        onPress={onPressRegister}
        title="Register"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      <View style={{ paddingTop: "15%" }}>
        <Text>Have you register before?</Text>
      </View>

      <View style={{ paddingTop: "5%" }}>
        <Text style={styles.mainTitle}>Login</Text>
      </View>

      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={() => {}}
          value={text}
          placeholder={"Email address"}
        />
        <TextInput
          style={styles.input}
          onChangeText={() => {}}
          value={number}
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
