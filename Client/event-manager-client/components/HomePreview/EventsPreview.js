import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { allEvents, base_url } from "../../constants/urls";
import EventEntity from "../../Entities/EventEntity";
import EventItem from "../basicComponents/Events/EventItem";
import UserAuthentication from "../../global/UserAuthentication";
import { useNavigation } from "@react-navigation/native";

const EventsPreview = (props) => {
  const navigation = useNavigation();
  const myContext = useContext(UserAuthentication);

  const [previewEventsData, setPreviewEventsData] = useState([]);
  const url = base_url + allEvents;

  const getData = useCallback(async () => {
    await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${myContext.token}`,
        },
      },
      { timeout: 2000 }
    )
      .then(async (res) => {
        const data = await res.json();
        const loadedEvents = [];
        for (const key in data) {
          loadedEvents.push(
            new EventEntity(
              data[key].id,
              data[key].event_manager,
              data[key].type,
              // data[key].owners,
              data[key].event_name,
              data[key].date,
              data[key].budget,
              data[key].location,
              data[key].meetings,
              data[key].suppliers
            )
          );
        }

        setPreviewEventsData(loadedEvents);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    getData()
      .then((res) => res)
      .catch((error) => console.log(error));
  }, []);

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
        onPress={() => navigation.navigate("AllEvents")}
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
