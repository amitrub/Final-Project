import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import RegisterInput from "../../components/basicComponents/RegisterPage/RegisterInput";
import LoginInput from "../../components/basicComponents/RegisterPage/LoginInput";
import Log from "../../constants/logger";

const RegisterPage = (props) => {
  Log.info("Register Page >> loading");

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <RegisterInput />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterPage;
