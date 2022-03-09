import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import RegisterInput from "../../components/basicComponents/RegisterPage/RegisterInput";
import LoginInput from "../../components/basicComponents/RegisterPage/LoginInput";

const RegisterPage = (props) => {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <RegisterInput />

        <View style={{ paddingTop: "15%", alignItems: "center" }}>
          <Text>Already registered? Sign in...</Text>
          <Text>-------------------------------------</Text>
        </View>

        <LoginInput navi={props.navigation} />
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
