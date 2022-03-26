import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import mealsReducer from "./store/reducers/meals";
import usersReducer from "./store/reducers/users";
import meetingsReducer from "./store/reducers/meetings";
import eventsReducer from "./store/reducers/events";
import UserAuthentication from "./global/UserAuthentication";
import WelcomePage from "./screens/main-screens/WelcomePage";
import RegisterPage from "./screens/main-screens/RegisterPage";
import MeetingsPage from "./screens/event-manager-screens/meetings/MeetingsPage";
import MeetingPage from "./screens/event-manager-screens/events/EventPage";
import AllEventsPage from "./screens/event-manager-screens/events/AllEventsPage";
import EventPage from "./screens/event-manager-screens/events/EventPage";
import TasksPage from "./screens/event-manager-screens/tasks/TasksPage";
import HomePage from "./screens/main-screens/HomePage";
import AddEventOwners from "./screens/add-event-screens/AddEventOwners";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import ProfilePage from "./screens/user-profile-screens/ProfilePage";
import CalendarPage from "./screens/user-profile-screens/CalendarPage";

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

const WelcomeStack = createNativeStackNavigator();
export const WelcomeStackScreen = () => {
  return (
    <WelcomeStack.Navigator screenOptions={{}}>
      <WelcomeStack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{
          headerShown: false,
        }}
      />
      <WelcomeStack.Screen name="Register" component={RegisterPage} />
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

const Tab = createBottomTabNavigator();
export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomePageStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name={"home"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name={"megaphone"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name={"calendar"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name={"users"} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomePageStack = createNativeStackNavigator();
export const HomePageStackScreen = () => {
  return (
    <HomePageStack.Navigator>
      <HomePageStack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <HomePageStack.Screen name="Tasks" component={TasksPage} />
      <HomePageStack.Screen name="EventPage" component={EventPage} />
      <HomePageStack.Screen name="AllEvents" component={AllEventsPage} />
      <HomePageStack.Screen name="Meeting" component={MeetingPage} />
      <HomePageStack.Screen name="Meetings" component={MeetingsPage} />
      <HomePageStack.Screen name="AddEventOwners" component={AddEventOwners} />
    </HomePageStack.Navigator>
  );
};

const EventsStack = createNativeStackNavigator();
export const EventsStackScreen = () => {
  return (
    <EventsStack.Navigator>
      <EventsStack.Screen name="AllEvents" component={AllEventsPage} />
      <EventsStack.Screen name="Tasks" component={TasksPage} />
      <EventsStack.Screen name="EventPage" component={EventPage} />
      <EventsStack.Screen name="Meeting" component={MeetingPage} />
      <EventsStack.Screen name="Meetings" component={MeetingsPage} />
      <EventsStack.Screen name="AddEventOwners" component={AddEventOwners} />
    </EventsStack.Navigator>
  );
};

const ProfileStack = createNativeStackNavigator();
export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <EventsStack.Screen name="ProfilePage" component={ProfilePage} />
    </ProfileStack.Navigator>
  );
};

const CalendarStack = createNativeStackNavigator();
export const CalendarStackScreen = () => {
  return (
    <CalendarStack.Navigator>
      <EventsStack.Screen name="CalendarPage" component={CalendarPage} />
    </CalendarStack.Navigator>
  );
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
        <NavigationContainer>
          <WelcomeStackScreen />
        </NavigationContainer>
      </Provider>
    </UserAuthentication.Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
