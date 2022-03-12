import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../constants/colors";
import MeetingsPreview from "../../components/HomePreview/MeetingsPreview";
import EventsPreview from "../../components/HomePreview/EventsPreview";
import TasksPreview from "../../components/HomePreview/TasksPreview";
import { useDispatch, useSelector } from "react-redux";
import * as eventsActions from "../../store/actions/events";
import Entypo from "react-native-vector-icons/Entypo";
import UserAuthentication from "../../global/UserAuthentication";

const HomePage = (props) => {
  const myContext = useContext(UserAuthentication);
  console.log("myContext homepage", myContext);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.row}>
          <Text style={styles.mainTitle}>Hello Hadasi Hayafa</Text>
          <Entypo name="plus" size={20} />
        </View>
        <View style={{ paddingTop: "7%" }}>
          <MeetingsPreview HomeProps={props} />
        </View>
        <View style={{ paddingTop: "7%" }}>
          <EventsPreview HomeProps={props} />
        </View>
        <View style={{ paddingTop: "7%" }}>
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
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 30,
    width: 400,
  },
});

export default HomePage;
