import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import UserAuthentication from "./common/global/UserAuthentication";
import { WelcomeStackScreen } from "./navigation/welcomeStack";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./common/assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./common/assets/fonts/OpenSans-Bold.ttf"),
    "alef-regular": require("./common/assets/fonts/Alef-Regular.ttf"),
    "alef-bold": require("./common/assets/fonts/Alef-Bold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  //Context fields
  const [id, setId] = useState(-1);
  const [token, setToken] = useState("");
  const [name, setName] = useState("guest");
  const [refresh, setRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const userAuth = {
    id: id,
    token: token,
    name: name,
    refresh: refresh,
    setId: setId,
    setToken: setToken,
    setName: setName,
    setRefresh: setRefresh,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    debugMode: debugMode,
    setDebugMode: setDebugMode,
  };
  if (!dataLoaded) {
    console.log("Uploading data...");
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <UserAuthentication.Provider value={userAuth}>
      <NavigationContainer>
        <WelcomeStackScreen />
      </NavigationContainer>
    </UserAuthentication.Provider>
  );
}
