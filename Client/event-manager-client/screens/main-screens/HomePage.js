import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../constants/colors";
import MeetingsPreview from "../../components/HomePreview/MeetingsPreview";
import EventsPreview from "../../components/HomePreview/EventsPreview";
import TasksPreview from "../../components/HomePreview/TasksPreview";

const HomePage = (props) => {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        {/*<View style={{ paddingTop: "15%" }}>*/}
        <Text style={styles.mainTitle}>Hello Hadasi kof sheli balev</Text>
        {/*</View>*/}
        <View style={{ paddingTop: "15%" }}>
          <MeetingsPreview HomeProps={props} />
        </View>
        <View style={{ paddingTop: "15%" }}>
          <EventsPreview HomeProps={props} />
        </View>
        <View style={{ paddingTop: "15%" }}>
          <TasksPreview HomeProps={props} />
        </View>
      </ScrollView>
    </SafeAreaView>
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
