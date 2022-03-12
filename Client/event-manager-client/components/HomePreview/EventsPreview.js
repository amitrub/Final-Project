import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { allEvents, base_url } from "../../constants/urls";
import EventEntity from "../../Entities/EventEntity";
import EventItem from "../basicComponents/Events/EventItem";
import UserAuthentication from "../../global/UserAuthentication";

const EventsPreview = (props) => {
  const myContext = useContext(UserAuthentication);
  const [previewEventsData, setPreviewEventsData] = useState([]);
  const url = base_url + allEvents;

  const getData = useCallback(async () => {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${myContext.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        const loadedEvents = [];
        for (const key in data) {
          loadedEvents.push(
            new EventEntity(
              data[key].owners,
              data[key].location,
              data[key].type,
              data[key].date
            )
          );
        }

        setPreviewEventsData(loadedEvents);
      })
      .catch((error) => console.log("hadas", error));
  }, []);
  useEffect(() => {
    getData()
      .then((res) => res)
      .catch((error) => console.log(error));
  });

  const body = (
    <View>
      {previewEventsData?.map((previewEvent) => {
        return (
          <EventItem
            date={previewEvent.date}
            owners={previewEvent.owners}
            type={previewEvent.type}
            location={previewEvent.location}
            navi={props.HomeProps.navigation}
          />
        );
      })}
    </View>
  );

  const previewTitle = (
    <View style={styles.row}>
      <Text style={styles.textTitle}>Upcoming events</Text>
      <Entypo
        name="dots-three-horizontal"
        size={22}
        onPress={() =>
          props.HomeProps.navigation.navigate("AllEvents", {
            HomeProps: props,
          })
        }
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
