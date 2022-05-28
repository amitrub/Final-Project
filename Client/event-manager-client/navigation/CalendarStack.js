import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarPage from "../screens/user-profile-screens/CalendarPage";
import React from "react";

export const CalendarStackScreen = () => {
  const CalendarStack = createNativeStackNavigator();
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen name="My Calendar" component={CalendarPage} />
    </CalendarStack.Navigator>
  );
};
