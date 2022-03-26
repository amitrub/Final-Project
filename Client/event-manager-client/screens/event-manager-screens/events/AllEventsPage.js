import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import { allEvents, base_url } from "../../../constants/urls";
import EventEntity from "../../../Entities/EventEntity";
import EventItem from "../../../components/basicComponents/Events/EventItem";
import Entypo from "react-native-vector-icons/Entypo";
import UserAuthentication from "../../../global/UserAuthentication";

const AllEventsPage = (props) => {
  // const params = props.route.params;
  const myContext = useContext(UserAuthentication);
  const [allEventsData, setAllEventsData] = useState([]);
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

        setAllEventsData(loadedEvents);
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
      {allEventsData?.map((previewEvent, index) => {
        return <EventItem key={index} event={previewEvent} />;
      })}
    </View>
  );

  const AllEventsTitle = (
    <View style={styles.row}>
      <Text style={styles.mainTitle}>Events</Text>
      <Entypo
        name="plus"
        size={20}
        onPress={() => props.navigation.navigate("AddEventOwners")}
      />
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
