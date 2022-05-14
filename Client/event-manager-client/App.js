import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
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
import AddEventDetails from "./screens/add-event-screens/AddEventDetails";
import AllEventsSuppliers from "./screens/event-manager-screens/suppliers/AllEventsSuppliers";
import SupplierPage from "./screens/event-manager-screens/suppliers/SupplierPage";
import AddSupplierContact from "./screens/event-manager-screens/suppliers/AddSupplierContact";
import EventSchedulePage from "./screens/event-manager-screens/events/EventSchedulePage";

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "alef-regular": require("./assets/fonts/Alef-Regular.ttf"),
    "alef-bold": require("./assets/fonts/Alef-Bold.ttf"),
  });
};

const emptyHeader = {
  headerTransparent: true,
  headerTitle: "",
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
      <HomePageStack.Screen
        name="EventPage"
        component={EventPage}
        options={emptyHeader}
      />
      <HomePageStack.Screen
        name="AllEvents"
        component={AllEventsPage}
        options={emptyHeader}
      />
      <HomePageStack.Screen
        name="Meeting"
        component={MeetingPage}
        options={emptyHeader}
      />
      <HomePageStack.Screen
        name="Meetings"
        component={MeetingsPage}
        options={emptyHeader}
      />
      <HomePageStack.Screen
        name="AddEventDetails"
        component={AddEventDetails}
        options={emptyHeader}
      />
      <HomePageStack.Screen
        name="AddEventOwners"
        component={AddEventOwners}
        options={emptyHeader}
      />
      <HomePageStack.Screen
        name="AllEventsSuppliers"
        component={AllEventsSuppliers}
        options={emptyHeader}
      />
      <HomePageStack.Screen
        name="SupplierPage"
        component={SupplierPage}
        options={emptyHeader}
      />
      <HomePageStack.Screen
        name="AddSupplierContact"
        component={AddSupplierContact}
        options={emptyHeader}
      />
        <HomePageStack.Screen
            name="EventSchedulePage"
            component={EventSchedulePage}
            options={emptyHeader}
        />
    </HomePageStack.Navigator>
  );
};

const EventsStack = createNativeStackNavigator();
export const EventsStackScreen = () => {
  return (
    <EventsStack.Navigator>
      <EventsStack.Screen
        name="AllEvents"
        component={AllEventsPage}
        options={emptyHeader}
      />
      <EventsStack.Screen
        name="Tasks"
        component={TasksPage}
        options={emptyHeader}
      />
      <EventsStack.Screen
        name="EventPage"
        component={EventPage}
        options={emptyHeader}
      />
      <EventsStack.Screen
        name="Meeting"
        component={MeetingPage}
        options={emptyHeader}
      />
      <EventsStack.Screen
        name="Meetings"
        component={MeetingsPage}
        options={emptyHeader}
      />
      <EventsStack.Screen
        name="AddEventDetails"
        component={AddEventDetails}
        options={emptyHeader}
      />
      <EventsStack.Screen
        name="AddEventOwners"
        component={AddEventOwners}
        options={emptyHeader}
      />
      <EventsStack.Screen
        name="AllEventsSuppliers"
        component={AllEventsSuppliers}
        options={emptyHeader}
      />
      <EventsStack.Screen
        name="SupplierPage"
        component={SupplierPage}
        options={emptyHeader}
      />
      <EventsStack.Screen
        name="AddSupplierContact"
        component={AddSupplierContact}
        options={emptyHeader}
      />
        <EventsStack.Screen
            name="EventSchedulePage"
            component={EventSchedulePage}
            options={emptyHeader}
        />
    </EventsStack.Navigator>
  );
};

const ProfileStack = createNativeStackNavigator();
export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfilePage" component={ProfilePage} />
    </ProfileStack.Navigator>
  );
};

const CalendarStack = createNativeStackNavigator();
export const CalendarStackScreen = () => {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen name="My Calendar" component={CalendarPage} />
    </CalendarStack.Navigator>
  );
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  //Context fields
  const [id, setId] = useState(-1);
  const [token, setToken] = useState("");
  const [name, setName] = useState("guest");
  const [refresh, setRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
    error: error,
    setError: setError,
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

