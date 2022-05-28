import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomePage from "../screens/main-screens/WelcomePage";
import RegisterPage from "../screens/main-screens/RegisterPage";
import React from "react";
import { TabNavigator } from "./tabNavigator";

export const emptyHeader = {
  headerTransparent: true,
  headerTitle: "",
};

export const WelcomeStackScreen = () => {
  const WelcomeStack = createNativeStackNavigator();
  return (
    <WelcomeStack.Navigator screenOptions={{}}>
      <WelcomeStack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{
          headerShown: false,
        }}
      />
      <WelcomeStack.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={emptyHeader}
      />
      <WelcomeStack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </WelcomeStack.Navigator>
  );
};
