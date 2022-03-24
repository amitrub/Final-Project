import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import ScreenNavigation from "./navigation/ScreenNavigation";
import { enableScreens } from "react-native-screens";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import mealsReducer from "./store/reducers/meals";
import usersReducer from "./store/reducers/users";
import meetingsReducer from "./store/reducers/meetings";
import eventsReducer from "./store/reducers/events";
import UserAuthentication from "./global/UserAuthentication";

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
  users: usersReducer,
  meetings: meetingsReducer,
  events: eventsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "alef-regular": require("./assets/fonts/Alef-Regular.ttf"),
    "alef-bold": require("./assets/fonts/Alef-Bold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  //Context fields
  const [id, setId] = useState(-1);
  const [token, setToken] = useState("");
  const [name, setName] = useState("guest");
  const userAuth = {
    id: id,
    token: token,
    name: name,
    setId: setId,
    setToken: setToken,
    setName: setName,
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
      <Provider store={store}>
        <ScreenNavigation />
      </Provider>
    </UserAuthentication.Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
