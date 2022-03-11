import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import { base_url, firebaseJson, previewEvents } from "../../../constants/urls";
import EventEntity from "../../../Entities/EventEntity";
import EventItem from "../../../components/basicComponents/Events/EventItem";
import Entypo from "react-native-vector-icons/Entypo";

const AllEventsPage = (props) => {
  debugger;
  const { HomeProps } = props.navigation.state.params;
  const [previewEventsData, setPreviewEventsData] = useState([]);
  const url = base_url + previewEvents + firebaseJson;

  const getData = useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();
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
            navi={HomeProps.navigation}
          />
        );
      })}
    </View>
  );

  const AllEventsTitle = (
    <View style={styles.row}>
      <Text style={styles.mainTitle}>Events</Text>
      <Entypo name="plus" size={20} />
    </View>
  );

  return (
    <View style={styles.screen}>
      {AllEventsTitle}
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 30,
    width: 500,
    padding: 15,
  },
  textTitle: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "left",
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
});
export default AllEventsPage;
