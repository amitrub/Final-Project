import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { allEvents, base_url } from "../../constants/urls";
import EventItem from "../basicComponents/Events/EventItem";
import UserAuthentication from "../../global/UserAuthentication";
import { useNavigation } from "@react-navigation/native";

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
    <View style={styles.row}>
      <Text style={styles.textTitle}>Upcoming events</Text>
      <Entypo
        name="dots-three-horizontal"
        size={22}
        onPress={() => navigation.navigate("Events")}
      />
    </View>
  );

  return (
    <View style={styles.screen}>
      {previewTitle}
      {body}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    display: "flex",
  },
  textTitle: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "left",
  },
});

export default EventsPreview;
