import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import WelcomePage from "../screens/main-screens/WelcomePage";
import RegisterPage from "../screens/main-screens/RegisterPage";
import HomePage from "../screens/main-screens/HomePage";
import MeetingPage from "../screens/event-manager-screens/events/EventPage";
import AllEventsPage from "../screens/event-manager-screens/events/AllEventsPage";
import EventPage from "../screens/event-manager-screens/events/EventPage";
import MeetingsPage from "../screens/event-manager-screens/meetings/MeetingsPage";
import TasksPage from "../screens/event-manager-screens/tasks/TasksPage";
import AddEventOwners from "../screens/add-event-screens/AddEventOwners";

const ScreenNavigation = createStackNavigator({
  Welcome: WelcomePage,
  Register: RegisterPage,
  HomePage: HomePage,
  Tasks: TasksPage,
  EventPage: EventPage,
  AllEvents: AllEventsPage,
  Meeting: MeetingPage,
  Meetings: MeetingsPage,
  AddEventOwners: AddEventOwners,
});

export default createAppContainer(ScreenNavigation);
