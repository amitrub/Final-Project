import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import EventItem from "../basicComponents/Events/EventItem";
import UserAuthentication from "../../global/UserAuthentication";
import { useNavigation } from "@react-navigation/native";
import { EventsPreviewStyles } from "../../styles/styles";

const EventsPreview = (props) => {
  const navigation = useNavigation();
  const myContext = useContext(UserAuthentication);
  const refresh = myContext.refresh;

  const [previewEventsData, setPreviewEventsData] = useState([]);

  useEffect(() => {
    setPreviewEventsData(props.events);
  }, [props.events, refresh]);

  const body = (
    <View>
      {previewEventsData?.map((previewEvent, index) => {
        return <EventItem key={index} event={previewEvent} />;
      })}
    </View>
  );

  const previewTitle = (
    <View style={EventsPreviewStyles.row}>
      <Text style={EventsPreviewStyles.textTitle}>Upcoming events</Text>
      <Entypo
        name="dots-three-horizontal"
        size={22}
        onPress={() => navigation.navigate("Events")}
      />
    </View>
  );

  return (
    <View style={EventsPreviewStyles.screen}>
      {previewTitle}
      {body}
    </View>
  );
};

export default EventsPreview;
