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
import apiRegisterUser from "../api/apiHandler";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";

const RegisterPage = (props) => {
  const [emailRegister, onChangeEmailRegister] = React.useState("");
  const [passwordRegister, onChangePasswordRegister] = React.useState("");
  const [nameRegister, onChangeNameRegister] = React.useState("");
  const [phoneRegister, onChangePhoneRegister] = React.useState("");

  const [emailLogin, onChangeEmailLogin] = React.useState("");
  const [passwordLogin, onChangePasswordLogin] = React.useState("");

  const [stam, onChangeStam] = React.useState("");

  const onPressRegister = async () => {
    console.log("onPressRegister");
    props.navigation.navigate("HomePage");
  };

  const onPressLogin = () => {
    console.log("onPressLogin");
    props.navigation.navigate("HomePage");
  };

  //HOW TO? get redux state in every component on the app
  const availableMeals = useSelector((state) => state["meals"].filteredMeals);
  console.log("availableMeals: " + availableMeals);

  const dispatch = useDispatch();
  const toggleFavoriteHandler = useCallback(() => {
    console.log("toggleFavoriteHandler");
    dispatch(toggleFavorite("mealId"));
  }, [dispatch]);

  useEffect(() => {
    // props.navigation.setParams({ mealTitle: selectedMeal.title });
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  return (
    <View style={styles.screen}>
      {/**** Extract RegisterInput Component ****/}
      <View style={{ paddingTop: "15%" }}>
        <Text style={styles.mainTitle}>REGISTER</Text>
      </View>

      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmailRegister}
          value={emailRegister}
          placeholder={"Email address"}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNameRegister}
          value={nameRegister}
          placeholder={"Full Name"}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePasswordRegister}
          value={passwordRegister}
          placeholder="password"
          // keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePhoneRegister}
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

      <View style={{ paddingTop: "15%" }}>
        <Text>{availableMeals}</Text>
        <Button
          onPress={toggleFavoriteHandler}
          title="Stam"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>

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
          onChangeText={onChangeEmailLogin}
          value={emailLogin}
          placeholder={"Email address"}
        />
        <TextInput
          style={styles.input}
          onChangeText={props.navigation.toggleFav}
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
