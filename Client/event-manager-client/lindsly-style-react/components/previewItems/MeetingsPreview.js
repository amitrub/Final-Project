import React from "react";
import { View, Text } from "react-native";
import MeetingItem from "../calendarItems/MeetingItem";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { MeetingsPreviewStyles } from "../../styles/styles";

const MeetingsPreview = (props) => {
  const navigation = useNavigation();
  const eventStages = props.eventStages;

  const eventStagesPreview = [];
  Object.keys(eventStages).forEach((key) => {
    eventStages[key].forEach((e) => {
      if (eventStagesPreview.length < 3) {
        eventStagesPreview.push(e);
      }
    });
  });

  const body = (
    <View>
      {eventStagesPreview.map((eventStage, index) => {
        const start_time = eventStage?.start_time?.split("T")[1]?.slice(0, 5);
        const end_time = eventStage?.end_time?.split("T")[1]?.slice(0, 5);
        const date = eventStage?.start_time?.split("T")[0];

        return (
          <View>
            <MeetingItem
              description={eventStage.description}
              key={index}
              time={`${start_time}-${end_time}`}
              eventName={eventStage.event}
              date={date}
            />
          </View>
        );
      })}
    </View>
  );

  const previewTitle = (
    <View style={MeetingsPreviewStyles.row}>
      <Text style={MeetingsPreviewStyles.textTitle}>Next meetings</Text>
      {/*<Entypo*/}
      {/*  name="dots-three-horizontal"*/}
      {/*  size={22}*/}
      {/*  onPress={() => navigation.navigate("My Calendar")}*/}
      {/*/>*/}
    </View>
  );

  return (
    <View style={MeetingsPreviewStyles.screen}>
      {previewTitle}
      {body}
    </View>
  );
};

export default MeetingsPreview;
