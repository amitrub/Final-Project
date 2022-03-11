import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../../../constants/colors";
import DetailEventItem from "../../../components/basicComponents/Events/DetailEventItem";
import EventDateTitle from "../../../components/basicComponents/EventDateTitle";

const EventPage = (props) => {
  const { location, date, owners, type } = props.navigation.state.params;
  return (
    <View>
      <ScrollView>
        <View style={{ paddingTop: "10%", paddingBottom: "5%" }}>
          <Text style={styles.mainTitle}>
            {owners}'s {type}
          </Text>
        </View>
        <View style={styles.screen}>
          <View paddingBottom="8%">
            <EventDateTitle date={date} />
          </View>
          <DetailEventItem key="1" title={"Location"} items={[location]} />
          <DetailEventItem key="2" title={"Suppliers"} items={["סאן", "שחר"]} />
          <DetailEventItem key="3" title={"Owners"} items={[owners]} />
          <DetailEventItem
            key="4"
            title={"Meetings"}
            items={["meeting1", "meeting2"]}
          />
          <DetailEventItem key="5" title={"לוז"} items={["רועי", "הדס"]} />
          <DetailEventItem key="6" title={"צק-ליסט"} items={["רועי", "הדס"]} />
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

export default EventPage;
