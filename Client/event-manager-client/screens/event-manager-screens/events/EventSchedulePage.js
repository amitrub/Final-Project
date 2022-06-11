import React, {useCallback, useContext, useEffect, useState} from "react";
import {Alert, Modal, Pressable, ScrollView, Text, TextInput, View,} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import UserAuthentication from "../../../global/UserAuthentication";
import Loader from "../../../components/basicComponents/others/Loader";
import Log from "../../../constants/logger";
import {AllEventsPageStyles as styles, EventPageStyles,} from "../../../styles/styles";
import EventMeetingItem from "../../../components/basicComponents/EventMeetingItem";
import cancelModalButton from "../../../components/basicComponents/buttons/CancelModalButton";
import EventScheduleEntity from "../../../Entities/EventScheduleEntity";
import {addEventScheduleRequest, getEventScheduleRequest,} from "../../../api/EventPage/EventsPageApi";
import TimePickerInput from "../../../components/basicComponents/inputs/TimePickerInput";
import DatePickerInput from "../../../components/basicComponents/inputs/DatePickerInput";
import {logAndCreateErrorMessage} from "../../../validations/validations";

const EventSchedulePage = (props) => {
    const params = props.route.params;
    const eventId = params.eventId;
    const eventName = params.eventName;

    const myContext = useContext(UserAuthentication);
    const {refresh, isLoading, setIsLoading} = myContext;
    const [eventSchedulesData, setEventSchedulesData] = useState([]);
    const [eventSchedulesByDate, setEventSchedulesByDate] = useState({});

    const [meetingToAdd, setMeetingToAdd] = useState(
        new EventScheduleEntity("", "", "")
    );
    const [meetingDescription, setMeetingDescription] = useState("");
    const [meetingDate, setMeetingDate] = useState("");
    const [meetingStartTime, setMeetingStartTime] = useState("");
    const [meetingEndTime, setMeetingEndTime] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const getData = useCallback(async () => {
        await getEventScheduleRequest(
            myContext,
            eventId,
            setEventSchedulesData,
            setEventSchedulesByDate
        );
    }, [eventSchedulesData, refresh]);
    useEffect(() => {
        setIsLoading(true);
        getData()
            .then((res) => res)
            .catch((error) => Log.Error(error));
    }, [eventId, refresh]);
    const addMeetingModal = () => {
        function getPresaleUpdateButton() {
            return (
                <Pressable
                    style={[EventPageStyles.button, EventPageStyles.buttonUpdate]}
                    onPress={async () => {
                        const startTime = `${meetingDate} ${meetingStartTime}`;
                        const endTime = `${meetingDate} ${meetingEndTime}`;

                        function isValidTime(meetingTime) {
                            let split = meetingTime?.split(" ");
                            if (split.length !== 2) {
                                return false;
                            }
                            let currDate = split[0];
                            let currTime = split[1];
                            return currDate.length === 10 && currTime.length === 5;
                        }

                        function resetFields() {
                            setMeetingDescription("");
                            setMeetingDate("");
                            setMeetingStartTime("");
                            setMeetingEndTime("");
                        }

                        if (isValidTime(startTime) && isValidTime(endTime)) {
                            let tmp = meetingToAdd;
                            meetingToAdd.description = meetingDescription;
                            meetingToAdd.start_time = startTime;
                            meetingToAdd.end_time = endTime;
                            setMeetingToAdd(tmp);
                            await addEventScheduleRequest(myContext, eventId, meetingToAdd);
                            resetFields();
                            setModalVisible(!modalVisible);
                        } else {
                            logAndCreateErrorMessage(
                                {
                                    Error:
                                        "Missing props, choose date, start and end time please",
                                },
                                "Add Event Schedule"
                            );
                        }
                    }}
                >
                    <Text style={EventPageStyles.textStyle}>Update</Text>
                </Pressable>
            );
        }

        function getEventSchedulerInputs() {
            return (
                <>
                    <TextInput
                        style={EventPageStyles.input}
                        onChangeText={setMeetingDescription}
                        value={meetingDescription}
                        placeholder={"stage name"}
                    />
                    <View style={{height: 25, width: 250, paddingBottom: 70}}>
                        <TimePickerInput
                            time={meetingStartTime}
                            setTime={setMeetingStartTime}
                            placeholder={"select start time"}
                        />
                    </View>
                    <View style={{height: 25, width: 250, paddingBottom: 70}}>
                        <TimePickerInput
                            time={meetingEndTime}
                            setTime={setMeetingEndTime}
                            placeholder={"select end time"}
                        />
                    </View>
                    <View style={{height: 25, width: 250, paddingBottom: 70}}>
                        <DatePickerInput date={meetingDate} setDate={setMeetingDate}/>
                    </View>
                </>
            );
        }

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
                        <Text style={EventPageStyles.modalText}>
                            Add stage to your event
                        </Text>
                        {getEventSchedulerInputs()}
                        <View style={EventPageStyles.row}>
                            {getPresaleUpdateButton()}
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
                {eventSchedulesData.length === 0 || eventSchedulesByDate.size === 0 ? (
                    <Text>Add meetings to your schedule!</Text>
                ) : (
                    Object.keys(eventSchedulesByDate)
                        .sort((str1, str2) => {
                            return str1 > str2;
                        })
                        .map((date, index) => {
                            return (
                                <View key={index} style={{width: 350, margin: 10}}>
                                    <Text style={[styles.textTitle, {fontSize: 20}]}>
                                        {date}
                                    </Text>
                                    {eventSchedulesByDate[date]?.map((meetingItem, index) => {
                                        return <EventMeetingItem key={index} item={meetingItem}/>;
                                    })}
                                </View>
                            );
                        })
                )}
            </ScrollView>
        );
    };
    const title = () => {
        return (
            <View style={styles.row}>
                <View style={{paddingBottom: "5%"}}>
                    <Text style={styles.mainTitle}>Event schedule</Text>
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
    if (isLoading) return <Loader/>;

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
