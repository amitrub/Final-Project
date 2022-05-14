import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  Alert,
  TextInput,
  Pressable,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import UserAuthentication from "../../../global/UserAuthentication";
import Loader from "../../../components/basicComponents/others/Loader";
import ErrorScreen, {
  ErrorMessages,
} from "../../../components/basicComponents/others/ErrorScreen";
import Log from "../../../constants/logger";
import {
  AllEventsPageStyles as styles,
  EventPageStyles,
} from "../../../Styles/styles";
import { base_url, postEventSchedule } from "../../../constants/urls";
import EventMeetingItem from "../../../components/basicComponents/EventMeetingItem";
import cancelModalButton from "../../../components/basicComponents/buttons/CancelModalButton";
import EventScheduleEntity from "../../../Entities/EventScheduleEntity";
import { createOneButtonAlert } from "../../../constants/errorHandler";
import {
  addEventScheduleRequest,
  getEventScheduleRequest,
} from "../../../api/EventPage/EventsPageApi";

const EventSchedulePage = (props) => {
  const params = props.route.params;
  const navigation = props.navigation;
  const eventId = params.eventId;
  const eventName = params.eventName;

  const myContext = useContext(UserAuthentication);
  const { refresh, error, setError, isLoading, setIsLoading } = myContext;
  const [eventSchedulesData, setEventSchedulesData] = useState([]);
  const url = base_url + postEventSchedule(eventId);

  const [meetingToAdd, setMeetingToAdd] = useState(
    new EventScheduleEntity("", "", "")
  );
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingStartTime, setMeetingStartTime] = useState("");
  const [meetingEndTime, setMeetingEndTime] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const getData = useCallback(async () => {
    console.log("url", url);
    await getEventScheduleRequest(myContext, eventId, setEventSchedulesData);
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    getData()
      .then((res) => res)
      .catch((error) => Log.Error(error));
  }, [eventId, refresh]);
  const addMeetingModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={EventPageStyles.centeredView}>
          <View style={EventPageStyles.modalView}>
            <Text style={EventPageStyles.modalText}>Add schedule item</Text>
            <TextInput
              style={EventPageStyles.input}
              onChangeText={setMeetingStartTime}
              value={meetingStartTime}
              placeholder={"start time [yyyy-mm-dd hh:mm]"}
            />
            <TextInput
              style={EventPageStyles.input}
              onChangeText={setMeetingEndTime}
              value={meetingEndTime}
              placeholder={"end time [yyyy-mm-dd hh:mm]"}
            />
            <TextInput
              style={EventPageStyles.input}
              onChangeText={setMeetingDescription}
              value={meetingDescription}
              placeholder={"description"}
            />
            <View style={EventPageStyles.row}>
              <Pressable
                style={[EventPageStyles.button, EventPageStyles.buttonUpdate]}
                onPress={async () => {
                  function isValidTime(meetingTime) {
                    let split = meetingTime?.split(" ");
                    if (split.length !== 2) {
                      return false;
                    }
                    let currDate = split[0];
                    let currTime = split[1];
                    return currDate.length === 10 && currTime.length === 5;
                  }

                  if (
                    isValidTime(meetingStartTime) &&
                    isValidTime(meetingEndTime)
                  ) {
                    let tmp = meetingToAdd;
                    meetingToAdd.description = meetingDescription;
                    meetingToAdd.start_time = meetingStartTime;
                    meetingToAdd.end_time = meetingEndTime;
                    setMeetingToAdd(tmp);
                    await addEventScheduleRequest(
                      myContext,
                      eventId,
                      meetingToAdd
                    );
                    setModalVisible(!modalVisible);
                  } else {
                    createOneButtonAlert(
                      "please enter start and end time on [yyyy-mm-dd hh:mm] format"
                    );
                  }
                }}
              >
                <Text style={EventPageStyles.textStyle}>Update</Text>
              </Pressable>
              {cancelModalButton(() => setModalVisible(!modalVisible))}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const body = () => {
    return (
      <ScrollView>
        {eventSchedulesData.length === 0 ? (
          <Text>Add meetings to your schedule!</Text>
        ) : (
          eventSchedulesData?.map((meetingItem, index) => {
            return <EventMeetingItem key={index} item={meetingItem} />;
          })
        )}
      </ScrollView>
    );
  };
  const title = () => {
    return (
      <View style={styles.row}>
        <View style={{ paddingBottom: "5%" }}>
          <Text style={styles.mainTitle}>Event scheduler</Text>
          <Text style={styles.textTitle}>{eventName}</Text>
        </View>
        <Entypo
          name="plus"
          size={24}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </View>
    );
  };
  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.Fetching} />;

  return (
    <View>
      {addMeetingModal()}
      <View style={styles.screen}>
        {title()}
        {body()}
      </View>
    </View>
  );
};

export default EventSchedulePage;
