import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllEventsPage from "../screens/event-manager-screens/events/AllEventsPage";
import TasksPage from "../screens/event-manager-screens/tasks/TasksPage";
import EventPage from "../screens/event-manager-screens/events/EventPage";
import AddEventDetails from "../screens/add-event-screens/AddEventDetails";
import AddEventOwners from "../screens/add-event-screens/AddEventOwners";
import AllEventsSuppliers from "../screens/event-manager-screens/suppliers/AllEventsSuppliers";
import SupplierPage from "../screens/event-manager-screens/suppliers/SupplierPage";
import AddSupplierContact from "../screens/event-manager-screens/suppliers/AddSupplierContact";
import EventSchedulePage from "../screens/event-manager-screens/events/EventSchedulePage";
import React from "react";

export const emptyHeader = {
  headerTransparent: true,
  headerTitle: "",
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
      {/*<EventsStack.Screen*/}
      {/*  name="Meeting"*/}
      {/*  component={MeetingPage}*/}
      {/*  options={emptyHeader}*/}
      {/*/>*/}
      {/*<EventsStack.Screen*/}
      {/*  name="Meetings"*/}
      {/*  component={MeetingsPage}*/}
      {/*  options={emptyHeader}*/}
      {/*/>*/}
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
