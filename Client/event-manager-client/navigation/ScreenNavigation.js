import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import WelcomePage from "../screens/main-screens/WelcomePage";
import RegisterPage from "../screens/main-screens/RegisterPage";
import HomePage from "../screens/main-screens/HomePage";
import MeetingsPage from "../screens/event-manager-screens/MeetingsPage";
import MeetingPage from "../screens/event-manager-screens/MeetingPage";
import TasksPage from "../screens/event-manager-screens/TasksPage";
import EventsPage from "../screens/event-manager-screens/EventsPage";

const ScreenNavigation = createStackNavigator({
  Welcome: WelcomePage,
  Register: RegisterPage,
  HomePage: HomePage,
  Meetings: MeetingsPage,
  Tasks: TasksPage,
  Events: EventsPage,
  Meeting: MeetingPage,
});

export default createAppContainer(ScreenNavigation);
