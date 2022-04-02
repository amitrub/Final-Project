import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import EventPage from "../../../screens/event-manager-screens/events/EventPage";

const EventItem = (props) => {
  const navigation = useNavigation();
  console.log(props.event);

  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        navigation.navigate("EventPage", {
          event: props.event,
        });
      }}
    >
      <View>
        <Text style={styles.text}>{props.event.date}</Text>
        <Text style={styles.text}>{props.event.event_name}</Text>
      </View>
      <Text style={styles.text}>{props.event.type}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 6,
    backgroundColor: Colors.button_gray,
    borderRadius: 18,
    height: 60,
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 0,
    display: "flex",
  },
  text: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "left",
  },
});

export default EventItem;
