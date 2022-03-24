import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../../../constants/colors";
import DetailEventItem from "../../../components/basicComponents/Events/DetailEventItem";
import EventDateTitle from "../../../components/basicComponents/EventDateTitle";

const EventPage = (props) => {
  const event = props.navigation.state.params.event;
  debugger;
  return (
    <View>
      <ScrollView>
        <View style={{ paddingTop: "10%", paddingBottom: "5%" }}>
          <Text style={styles.mainTitle}>
            {event.event_name}'s {event.type}
          </Text>
        </View>
        <View style={styles.screen}>
          <View paddingBottom="4%">
            <EventDateTitle date={event.date} />
          </View>
          <View style={styles.listItem}>
            <Text style={styles.text}>{event.location}</Text>
          </View>
          {/*<DetailEventItem*/}
          {/*  key="2"*/}
          {/*  title={"Suppliers"}*/}
          {/*  items={event.suppliers}*/}
          {/*/>*/}
          <DetailEventItem
            key="3"
            title={"Owners"}
            items={[event.event_name]}
          />
          {/*<DetailEventItem key="4" title={"Meetings"} items={event.meetings} />*/}
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
  listItem: {
    backgroundColor: Colors.button_gray,
    borderRadius: 150,
    height: 40,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  text: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "center",
  },
});

export default EventPage;
