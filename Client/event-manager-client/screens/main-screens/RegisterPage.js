import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import RegisterInput from "../../components/basicComponents/RegisterPage/RegisterInput";
import LoginInput from "../../components/basicComponents/RegisterPage/LoginInput";

const RegisterPage = (props) => {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <LoginInput navi={props.navigation} />
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
