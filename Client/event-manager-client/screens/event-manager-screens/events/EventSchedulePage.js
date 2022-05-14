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
import { base_url, getOrPostEventSuppliers } from "../../../constants/urls";
import SupplierEntity from "../../../Entities/SupplierEntity";
import EventMeetingItem from "../../../components/basicComponents/EventMeetingItem";
import cancelModalButton from "../../../components/basicComponents/buttons/CancelModalButton";
import EventScheduleEntity from "../../../Entities/EventScheduleEntity";

const EventSchedulePage = (props) => {
    const params = props.route.params;
    const navigation = props.navigation;
    const eventId = params.eventId;
    const eventName = params.eventName;
    const eventSchedules = params.event_schedules;

    const myContext = useContext(UserAuthentication);
    const refresh = myContext.refresh;
    const [eventSuppliersData, setEventSuppliersData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const url = base_url + getOrPostEventSuppliers(eventId);

    const [meetingToAdd, setMeetingToAdd] = useState(
        new EventScheduleEntity("", "", "")
    );
    const [meetingDescription, setMeetingDescription] = useState("");
    const [meetingStartTime, setMeetingStartTime] = useState("");
    const [meetingEndTime, setMeetingEndTime] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

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
                const loadedSuppliers = [];
                for (const key in data) {
                    loadedSuppliers.push(
                        new SupplierEntity(
                            data[key].id,
                            data[key].name,
                            data[key].phone,
                            data[key].job,
                            data[key].price,
                            data[key].has_paid
                        )
                    );
                }

                setEventSuppliersData(loadedSuppliers);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                Log.error("AllEventsSuppliers >> getData >> error", err);
            });
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
                            onChangeText={setMeetingDescription}
                            value={meetingDescription}
                            placeholder={"description"}
                        />
                        <View style={EventPageStyles.row}>
                            <Pressable
                                style={[EventPageStyles.button, EventPageStyles.buttonUpdate]}
                                onPress={() => {
                                    let tmp = meetingToAdd;
                                    meetingToAdd.description = meetingDescription;
                                    setMeetingToAdd(tmp);
                                    setModalVisible(!modalVisible);
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
                {eventSchedules.length === 0 ? (
                    <Text>Add meetings to your schedule!</Text>
                ) : (
                    eventSchedules?.map((meetingItem, index) => {
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
