import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import MeetingsPreview from "../components/HomePreview/MeetingsPreview";
import EventsPreview from "../components/HomePreview/EventsPreview";
import TasksPreview from "../components/HomePreview/TasksPreview";

const HomePage = (props) => {
  return (
    <View style={styles.screen}>
      <View style={{ paddingTop: "15%" }}>
        <Text style={styles.mainTitle}>Hello Hadasi kof sheli balev</Text>
      </View>

      <View style={{ paddingTop: "15%" }}>
        <MeetingsPreview HomeProps={props} />
      </View>

      <View style={{ paddingTop: "15%" }}>
        <EventsPreview HomeProps={props} />
      </View>

      <View style={{ paddingTop: "15%" }}>
        <TasksPreview HomeProps={props} />
      </View>
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

export default HomePage;
