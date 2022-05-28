import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../screens/main-screens/HomePage";
import TasksPage from "../screens/event-manager-screens/tasks/TasksPage";
import EventPage from "../screens/event-manager-screens/events/EventPage";
import AllEventsPage from "../screens/event-manager-screens/events/AllEventsPage";
import MeetingPage from "../screens/event-manager-screens/events/EventPage";
import MeetingsPage from "../screens/event-manager-screens/meetings/MeetingsPage";
import AddEventDetails from "../screens/add-event-screens/AddEventDetails";
import AddEventOwners from "../screens/add-event-screens/AddEventOwners";
import AllEventsSuppliers from "../screens/event-manager-screens/suppliers/AllEventsSuppliers";
import SupplierPage from "../screens/event-manager-screens/suppliers/SupplierPage";
import AddSupplierContact from "../screens/event-manager-screens/suppliers/AddSupplierContact";
import EventSchedulePage from "../screens/event-manager-screens/events/EventSchedulePage";
import React from "react";
import { emptyHeader } from "./welcomeStack";

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
