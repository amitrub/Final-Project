import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as meetingsActions from "../../store/actions/meetings";
// import * as PropTypes from "prop-types";
import MeetingItem from "../basicComponents/MeetingItem";
import Entypo from "react-native-vector-icons/Entypo";
import {
  base_url,
  firebaseJson,
  previewMeetings,
  previewMeetingsCapitlP,
} from "../../constants/urls";
import EventEntity from "../../Entities/EventEntity";
import MeetingEntity from "../../Entities/MeetingEntity";

// MeetingItem.propTypes = { meeting: PropTypes.any };
const MeetingsPreview = (props) => {
  const [previewMeetingsData, setPreviewMeetingsData] = useState([]);
  const url = base_url + previewMeetingsCapitlP + firebaseJson;

  const getData = useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();
    const loadedEvents = [];

    for (const key in data) {
      loadedEvents.push(
        new MeetingEntity(
          data[key].time,
          data[key].location,
          data[key].Description
        )
      );
    }
    setPreviewMeetingsData(loadedEvents);
  }, []);

  useEffect(() => {
    getData()
      .then((res) => res)
      .catch((error) => console.log(error));
  });

  const body = (
    <View>
      {previewMeetingsData?.map((previewMeeting) => {
        return (
          <MeetingItem
            location={previewMeeting.location}
            time={previewMeeting.time}
            description={previewMeeting.description}
          />
        );
      })}
    </View>
  );

  const previewTitle = (
    <View style={styles.row}>
      <Text style={styles.textTitle}>Today's meetings</Text>
      <Entypo
        name="dots-three-horizontal"
        size={22}
        onPress={() => props.HomeProps.navigation.navigate("Meetings")}
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

export default MeetingsPreview;
