import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Colors from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";
import * as userActions from "../store/actions/users";
import RegisterInput from "../components/basicComponents/RegisterPage/RegisterInput";
import LoginInput from "../components/basicComponents/RegisterPage/LoginInput";

const RegisterPage = (props) => {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <RegisterInput />

        <View style={{ paddingTop: "15%", alignItems: "center" }}>
          <Text>Already registered? Sign in...</Text>
          <Text>-------------------------------------</Text>
        </View>

        <LoginInput />
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
