import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../../../constants/colors";
import DetailEventItem from "../../../components/basicComponents/Events/DetailEventItem";
import DateTitle from "../../../components/basicComponents/others/DateTitle";
import Entypo from "react-native-vector-icons/Entypo";
import IconButton from "../../../components/basicComponents/buttons/IconButton";

const EventPage = (props) => {
  const params = props.route.params;
  const navigation = props.navigation;

  const event = params.event;
  debugger;
  console.log(event);
  const eventName = `${event.event_name}'s ${event.type}`;

  //useEffect - executes after the component rendered
  //useLayoutEffect - run the effect together with rendering the component
  useLayoutEffect(() => {
    navigation.setOptions({
      title: eventName,
      headerRight: () => {
        return (
          <IconButton
            icon={"star"}
            color={"black"}
            onPress={() => console.log("Pressed!")}
          />
        );
      },
    });
  }, [navigation, eventName]);

  return (
    <View>
      <ScrollView>
        {/*<View style={{ paddingTop: "10%", paddingBottom: "5%" }}>*/}
        {/*  <Text style={styles.mainTitle}>{eventName}</Text>*/}
        {/*</View>*/}
        <View style={styles.screen}>
          <View paddingBottom="4%" paddingTop="15%">
            <DateTitle date={event.date} />
          </View>
          <View style={styles.listItem}>
            <Text style={styles.text}>{event.location}</Text>
          </View>
          <DetailEventItem
            key="3"
            title={"Owners"}
            items={event.event_owners.map((eventOwner) => eventOwner.name)}
          />
          <DetailEventItem key="7" title={"Budget"} items={[event.budget]} />
          {/*<DetailEventItem key="4" title={"Meetings"} items={event.event_schedules} />*/}
          <DetailEventItem
            key="5"
            title={"Event schedule"}
            items={["Hupa", "Dancing"]}
          />
          <DetailEventItem key="6" title={"Tasks"} items={["Dress", "Suite"]} />
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
