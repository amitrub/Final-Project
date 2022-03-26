import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Colors from "../../../constants/colors";

export const ErrorMessages = {
  Fetching: "Error fetching data... Check your network connection!",
  ImportContacts: "Error fetching contact!",
  Generic: "Error occurred on Event Manager App, call to Hadas 0533407634 :)",
};

const ErrorScreen = (props) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 18 }}>
      {props.errorMessage ? props.errorMessage : ErrorMessages.Generic}
    </Text>
  </View>
);

export default ErrorScreen;
