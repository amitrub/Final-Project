import { Alert } from "react-native";
import Log from "./logger";
import { TabNavigator } from "../App";
export const STATUS_SUCCESS = (status) => status >= 200 && status < 300;
export const STATUS_FAILED = (status) => status >= 400 && status < 600;

export const createOneButtonAlert = (
  message,
  button_text = "OK",
  title = "Event manager app",
  onPressFunction = () => {}
) => {
  console.log("createOneButtonAlert");
  return Alert.alert(title, message, [
    { text: button_text, onPress: onPressFunction },
  ]);
};

export const createTwoButtonAlert = (
  message,
  button_text_Ok = "OK",
  button_text_Cancel = "Cancel",
  title = "Event manager app",
  onPressOK = () => {},
  onPressCancel = () => {}
) => {
  console.log("createOneButtonAlert");
  return Alert.alert(title, message, [
    { text: button_text_Ok, onPress: onPressOK, style: "default" },
    { text: button_text_Cancel, onPress: onPressCancel, style: "default" },
  ]);
};

export const handleResponseRegister = async (response) => {
  try {
    const data = await response.json();

    if (STATUS_FAILED(response.status)) {
      const message = data.email[0];
      createOneButtonAlert(message, "OK", "Registration Failed");
    } else if (STATUS_SUCCESS(response.status)) {
      const message = "You have successfully registered!\nplease LOGIN";
      createOneButtonAlert(message, "OK", "Registration Succeeded");
    }
  } catch (error) {
    console.log("handleResponse error", error);
  }
};
