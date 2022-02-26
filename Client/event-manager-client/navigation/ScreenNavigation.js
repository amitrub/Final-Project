import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import WelcomePage from "../screens/WelcomePage";
import RegisterPage from "../screens/RegisterPage";
import HomePage from "../screens/HomePage";
import MeetingsPage from "../screens/event-manager-screens/MeetingsPage";
import TasksPage from "../screens/event-manager-screens/TasksPage";
import EventsPage from "../screens/event-manager-screens/EventsPage";

const ScreenNavigation = createStackNavigator({
  Welcome: WelcomePage,
  Register: RegisterPage,
  HomePage: HomePage,
  Meetings: MeetingsPage,
  Tasks: TasksPage,
  Events: EventsPage,
});

export default createAppContainer(ScreenNavigation);
