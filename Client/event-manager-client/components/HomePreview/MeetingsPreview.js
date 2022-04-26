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
import { useNavigation } from "@react-navigation/native";
import { MeetingsPreviewStyles } from '../../Styles/styles'

// MeetingItem.propTypes = { meeting: PropTypes.any };
const MeetingsPreview = (props) => {
  const navigation = useNavigation();
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
      <MeetingItem
        location={"LAGO"}
        time={"18:30"}
        description={"Choosing flowers to Hupa"}
      />
    </View>

    //TO BE CONTINUE
    // <View>
    //   {previewMeetingsData?.map((previewMeeting) => {
    //     return (
    //       <MeetingItem
    //         location={previewMeeting.location}
    //         time={previewMeeting.time}
    //         description={previewMeeting.description}
    //       />
    //     );
    //   })}
    // </View>
  );

  const previewTitle = (
    <View style={MeetingsPreviewStyles.row}>
      <Text style={MeetingsPreviewStyles.textTitle}>Today's meetings</Text>
      <Entypo
        name="dots-three-horizontal"
        size={22}
        onPress={() => navigation.navigate("Meetings")}
      />
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
