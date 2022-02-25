import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import WelcomePage from "../screens/WelcomePage";
import RegisterPage from "../screens/RegisterPage";

const ScreenNavigation = createStackNavigator({
  Welcome: WelcomePage,
  Register: RegisterPage,
});

export default createAppContainer(ScreenNavigation);
