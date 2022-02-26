import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../../constants/colors";
import EventDetailButton from "../../components/basicComponents/EventDetailButton";
import DateTitle from "../../components/basicComponents/DateTitle";

const MeetingPage = (props) => {
  return (
      <View>
          <ScrollView>
        <View style={{ paddingTop: "10%", paddingBottom: "5%"}}>
            <Text style={styles.mainTitle}>החתונה של הדס ורועי</Text>
        </View>
        <View style={styles.screen}>
            <View paddingBottom="8%">
                <DateTitle date={"23/09/2022"}/>
            </View>
            <EventDetailButton key="1" title={"אולם"} items={["כוכב הים"]}/>
            <EventDetailButton key="2" title={"ספקים"} items={["סאן","שחר"]}/>
            <EventDetailButton key="3" title={"בעלי אירוע"} items={["רועי", "הדס"]}/>
            <EventDetailButton key="4" title={"פגישות בנושא"} items={["רועי", "הדס"]}/>
            <EventDetailButton key="5" title={"לוז"} items={["רועי", "הדס"]}/>
            <EventDetailButton key="6" title={"צק-ליסט"} items={["רועי", "הדס"]}/>
        </View>
          </ScrollView>
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

export default MeetingPage;
