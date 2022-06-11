import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { EventScheduleStyle } from "../../styles/styles";
import Log from "../../constants/logger";
import Colors from "../../constants/colors";

const EventMeetingItem = (props) => {
  function getNameLetters(name) {
    try {
      if (!props.isEventItem) {
        let splitName = name?.split(" ");
        if (splitName.length < 2) {
          if (splitName.length === 1) {
            return splitName[0][0].toUpperCase();
          } else {
            return "Bla";
          }
        }
        if (!splitName) return "";
        return splitName[0][0].toUpperCase() + splitName[1][0].toUpperCase();
      }
      return "";
    } catch (e) {
      return "";
    }
  }
  function getHour(itemTime) {
    try {
      return itemTime.split("T")[1].slice(0, 5);
    } catch (e) {
      Log.warn("EventMeetingItem >> getHour >> error", e);
      return "00:00";
    }
  }
  const item = props.item;
  const itemName = props.isEventItem
    ? item.event_name
    : item.eventName
    ? item.eventName
    : item.event;
  const cardStyle = {
    backgroundColor: props.isEventItem
      ? Colors.darkseagreen
      : Colors.white_background,
  };

  if (!item) {
    return <Text>"Item didn't send as prop!"</Text>;
  }
  const startTime = props.isEventItem ? "" : getHour(item.start_time);
  const endTime = props.isEventItem ? "" : getHour(item.end_time);

  return (
    <TouchableOpacity style={styles.container}>
      <Card style={cardStyle}>
        <Card.Content>
          <View style={styles.itemView}>
            <View>
              <View style={{ paddingBottom: 5 }}>
                <Text style={EventScheduleStyle.timeText}>
                  {!props.isEventItem
                    ? `${startTime}-${endTime}`
                    : "Event day!"}
                </Text>
              </View>
              <Text style={EventScheduleStyle.nameText}>
                {props.isEventItem ? itemName : item.description}
              </Text>
              <Text style={EventScheduleStyle.descriptionText}>
                {props.isEventItem ? undefined : itemName}
              </Text>
            </View>
            {!props.isEventItem ? (
              <Avatar.Text
                label={getNameLetters(item.description)}
                backgroundColor={
                  "#" + Math.floor(Math.random() * 16777215).toString(16)
                }
              />
            ) : undefined}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default EventMeetingItem;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    marginTop: 17,
  },
  itemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textDesc: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "left",
  },
});
