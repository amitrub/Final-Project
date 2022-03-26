import React from "react";
import { ActivityIndicator, View } from "react-native";
import Colors from "../../../constants/colors";

const Loader = (props) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "75%",
    }}
  >
    <ActivityIndicator size="large" color={Colors.dark_gray} />
  </View>
);

export default Loader;
