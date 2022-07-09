import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "../screens/user-profile-screens/ProfilePage";
import React from "react";
import {emptyHeader} from "./homePageStack";

export const ProfileStackScreen = () => {
  const ProfileStack = createNativeStackNavigator();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfilePage" component={ProfilePage} options={emptyHeader}
 />
    </ProfileStack.Navigator>
  );
};
