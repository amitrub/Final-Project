import { Alert } from "react-native";
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
