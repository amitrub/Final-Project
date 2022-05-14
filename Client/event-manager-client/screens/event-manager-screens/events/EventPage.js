//useEffect - executes after the component rendered
//useLayoutEffect - run the effect together with rendering the component

import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DetailEventItem from "../../../components/basicComponents/Events/DetailEventItem";
import DateTitle from "../../../components/basicComponents/others/DateTitle";
import Entypo from "react-native-vector-icons/Entypo";
import Loader from "../../../components/basicComponents/others/Loader";
import ErrorScreen, {
  ErrorMessages,
} from "../../../components/basicComponents/others/ErrorScreen";
import Log from "../../../constants/logger";
import UserAuthentication from "../../../global/UserAuthentication";
import { base_url, getEvent } from "../../../constants/urls";
import { createOneButtonAlert } from "../../../constants/errorHandler";
import Colors from "../../../constants/colors";
import DatePickerInput from "../../../components/basicComponents/inputs/DatePickerInput";
import IconButton from "../../../components/basicComponents/buttons/IconButton";
import { EditEventEntity } from "../../../Entities/EventEntity";
import DetailItem from "../../../components/basicComponents/others/DetailItem";
import { EventPageStyles as styles } from "../../../styles/styles";
import {
  deleteEventRequest,
  editEventRequest,
  fetchEvent,
} from "../../../api/EventPage/EventsPageApi";
import cancelModalButton from "../../../components/basicComponents/buttons/CancelModalButton";

const EventPage = (props) => {
  const params = props.route.params;
  const navigation = props.navigation;
  const myContext = useContext(UserAuthentication);
  const { token, setIsLoading, setError, refresh } = myContext;
  const event_id = params.event.id;
  const url = base_url + getEvent(event_id);

  const [event, setEvent] = useState({});

  const [titleModalVisible, setTitleModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editBudget, setEditBudget] = useState(0);

  const getData = useCallback(async () => {
    // await fetchEvent(myContext, setEvent, setIsLoading, setError)
    await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      },
      { timeout: 2000 }
    )
      .then(async (res) => {
        const data = await res.json();
        setEvent(data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        Log.error("EventPage >> getData >> error", err);
      });
  }, [event_id]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Entypo
            name={"edit"}
            size={20}
            color={Colors.blueBack}
            onPress={() =>
              createOneButtonAlert(
                "Tap on any of the event details to edit it and save it when finished",
                "Got it",
                `Edit your event`
              )
            }
          />
        );
      },
    });

    setIsLoading(true);
    getData()
      .then((res) => {
        setEditTitle(event.event_name);
        setEditDate(event.date);
        setEditLocation(event.location);
        setEditBudget(event.budget);
        setIsLoading(false);
      })
      .catch((error) => Log.Error(error));
  }, [navigation, refresh]);

  const editTitleModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={titleModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setTitleModalVisible(!titleModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit event title</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEditTitle}
              value={editTitle}
            />
            <View style={styles.row}>
              <Pressable
                style={[styles.button, styles.buttonUpdate]}
                onPress={() => {
                  let tmpEvent = event;
                  tmpEvent.event_name = editTitle;
                  setEvent(tmpEvent);
                  setTitleModalVisible(!titleModalVisible);
                }}
              >
                <Text style={styles.textStyle}>Update</Text>
              </Pressable>
              {cancelModalButton(() =>
                setTitleModalVisible(!titleModalVisible)
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const editDateModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={dateModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setDateModalVisible(!dateModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit event date</Text>
            <View style={{ height: 25, width: 250, paddingBottom: 70 }}>
              <DatePickerInput date={editDate} setDate={setEditDate} />
            </View>
            <View style={styles.row}>
              <Pressable
                style={[styles.button, styles.buttonUpdate]}
                onPress={() => {
                  let tmpEvent = event;
                  tmpEvent.date = editDate;
                  setEvent(tmpEvent);
                  setDateModalVisible(!dateModalVisible);
                }}
              >
                <Text style={styles.textStyle}>Update</Text>
              </Pressable>
              {cancelModalButton(() => setDateModalVisible(!dateModalVisible))}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const editLocationModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={locationModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setLocationModalVisible(!locationModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit event location</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEditLocation}
              value={editLocation}
              // placeholder={"Email address"}
            />
            <View style={styles.row}>
              <Pressable
                style={[styles.button, styles.buttonUpdate]}
                onPress={() => {
                  let tmpEvent = event;
                  tmpEvent.location = editLocation;
                  setEvent(tmpEvent);
                  setLocationModalVisible(!locationModalVisible);
                }}
              >
                <Text style={styles.textStyle}>Update</Text>
              </Pressable>
              {cancelModalButton(() =>
                setLocationModalVisible(!locationModalVisible)
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const editBudgetModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={budgetModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setBudgetModalVisible(!budgetModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit event budget</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEditBudget}
              value={editBudget?.toString()}
              keyboardType="numeric"
            />
            <View style={styles.row}>
              <Pressable
                style={[styles.button, styles.buttonUpdate]}
                onPress={() => {
                  let tmpEvent = event;
                  tmpEvent.budget = editBudget;
                  setEvent(tmpEvent);
                  setBudgetModalVisible(!budgetModalVisible);
                }}
              >
                <Text style={styles.textStyle}>Update</Text>
              </Pressable>
              {cancelModalButton(() =>
                setBudgetModalVisible(!budgetModalVisible)
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const titleComponent = () => {
    return (
      <View style={[{ paddingTop: "28%" }, styles.rowTitle]}>
        <View style={{ paddingTop: 3 }}>
          <Entypo
            name={"trash"}
            size={24}
            color={"black"}
            onPress={() => deleteEventRequest(myContext, event_id, navigation)}
          />
        </View>
        <TouchableOpacity
          onPress={() => setTitleModalVisible(!titleModalVisible)}
        >
          <View>
            <Text style={styles.h1}>{event.event_name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const dateComponent = () => {
    return (
      <TouchableOpacity onPress={() => setDateModalVisible(!dateModalVisible)}>
        <View paddingBottom="4%" paddingTop="7%">
          <DateTitle date={event.date} />
        </View>
      </TouchableOpacity>
    );
  };
  const locationComponent = () => {
    return (
      <DetailItem
        title={"location"}
        value={event.location}
        onPress={() => setLocationModalVisible(!locationModalVisible)}
      />
    );
  };
  const ownersComponent = () => {
    return (
      <DetailEventItem
        key="3"
        title={"Owners"}
        items={event.event_owners?.map((eventOwner) => eventOwner.name)}
        onPress={() =>
          navigation.navigate("AddEventOwners", {
            event: event,
            editMode: true,
          })
        }
      />
    );
  };
  const budgetComponent = () => {
    return (
      <DetailItem
        title={"budget"}
        value={`${event.budget} ₪`}
        onPress={() => setBudgetModalVisible(!budgetModalVisible)}
      />
    );
  };
  const eventScheduleComponent = () => {
    return (
      <DetailItem
        title={"click to manage"}
        value={"Event Schedule"}
        onPress={() =>
          navigation.navigate("EventSchedulePage", {
            eventId: event.id,
            eventName: event.event_name,
            event_schedules: event.event_schedules,
          })
        }
      />
    );
  };
  const suppliersComponent = () => {
    return (
      <DetailItem
        title={"click to manage"}
        value={"Suppliers"}
        onPress={() =>
          navigation.navigate("AllEventsSuppliers", {
            eventId: event.id,
            eventName: event.event_name,
          })
        }
      />
    );
  };

  const onSaveEvent = async () => {
    let editEvent = new EditEventEntity(
      event.id,
      event.event_manager,
      event.type,
      event.event_name,
      event.date,
      event.budget,
      event.location
    );
    await editEventRequest(myContext, editEvent, event.id, navigation);
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.Fetching} />;

  return (
    <View>
      {editTitleModal()}
      {editDateModal()}
      {editLocationModal()}
      {editBudgetModal()}
      <ScrollView>
        <View style={styles.screen}>
          {titleComponent()}
          {dateComponent()}
          {locationComponent()}
          {budgetComponent()}
          {suppliersComponent()}
          {ownersComponent()}
          {eventScheduleComponent()}
          <View style={{ marginTop: 20 }}>
            <IconButton
              onPress={onSaveEvent}
              icon={"save"}
              color={Colors.black}
              iconSize={18}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventPage;
