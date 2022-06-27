import { Alert } from "react-native";
export const STATUS_SUCCESS = (status) => status >= 200 && status < 300;
export const STATUS_FAILED = (status) => status >= 400 && status < 600;

export const createOneButtonAlert = (
  message,
  button_text = "OK",
  title = "Event manager app",
  onPressFunction = () => {}
) => {
  //.log("createOneButtonAlert");
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
  //console.log("createOneButtonAlert");
  return Alert.alert(title, message, [
    { text: button_text_Ok, onPress: onPressOK, style: "default" },
    { text: button_text_Cancel, onPress: onPressCancel, style: "default" },
  ]);
};
