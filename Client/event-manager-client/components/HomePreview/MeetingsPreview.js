import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const MeetingsPreview = (props) => {
  console.log("MeetingsPreview");
  console.log(props);
  return (
    <View style={styles.screen}>
      <Text
        style={styles.mainTitle}
        onPress={() => props.HomeProps.navigation.navigate("Meetings")}
      >
        Today's meetings
      </Text>
      <Text style={styles.mainTitle}>Meetings preview</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
  },
});

export default MeetingsPreview;
