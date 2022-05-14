import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { EventScheduleStyle } from "../../Styles/styles";
import Log from "../../constants/logger";

const EventMeetingItem = (props) => {
  function getNameLetters(name) {
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
  function getHour(itemTime) {
    try {
      return itemTime.split("T")[1].slice(0, 5);
    } catch (e) {
      Log.error("EventMeetingItem >> getHour >> error", e);
      return "00:00";
    }
  }
  const item = props.item;

  if (!item) {
    return <Text>"Item didn't send as prop!"</Text>;
  }
  const startTime = getHour(item.start_time);
  const endTime = getHour(item.end_time);

  return (
    <TouchableOpacity
      style={{
        marginRight: 10,
        marginTop: 17,
      }}
    >
      <Card>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <View style={{ paddingBottom: 5 }}>
                <Text style={EventScheduleStyle.timeText}>
                  {startTime}-{endTime}
                </Text>
              </View>
              <Text style={EventScheduleStyle.nameText}>
                {item.description}
              </Text>
              <Text style={EventScheduleStyle.descriptionText}>
                {item.eventName}
              </Text>
            </View>
            <Avatar.Text
              label={getNameLetters(item.description)}
              backgroundColor={
                "#" + Math.floor(Math.random() * 16777215).toString(16)
              }
            />
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default EventMeetingItem;
