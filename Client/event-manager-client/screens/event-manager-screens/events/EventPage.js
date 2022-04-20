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
  StyleSheet,
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
import {
  createOneButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../../constants/errorHandler";
import Colors from "../../../constants/colors";
import DatePickerInput from "../../../components/basicComponents/inputs/DatePickerInput";
import IconButton from "../../../components/basicComponents/buttons/IconButton";
import { EditEventEntity } from "../../../Entities/EventEntity";
import fetchTimeout from "fetch-timeout";

const EventPage = (props) => {
  const params = props.route.params;
  const navigation = props.navigation;
  const myContext = useContext(UserAuthentication);
  const refresh = myContext.refresh;

  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [titleModalVisible, setTitleModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editBudget, setEditBudget] = useState(0);

  const event_id = params.event.id;
  const url = base_url + getEvent(event_id);

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
            name={"info"}
            size={20}
            color={"black"}
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

  const cancelModalButton = (closeModalFunc) => {
    return (
      <Pressable
        style={[styles.button, styles.buttonCancel]}
        onPress={closeModalFunc}
      >
        <Text style={styles.textStyle}>Cancel</Text>
      </Pressable>
    );
  };

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
      <TouchableOpacity
        onPress={() => setTitleModalVisible(!titleModalVisible)}
      >
        <View style={{ paddingTop: "28%" }}>
          <Text style={styles.h1}>{event.event_name}</Text>
        </View>
      </TouchableOpacity>
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
      <TouchableOpacity
        onPress={() => setLocationModalVisible(!locationModalVisible)}
      >
        <View style={styles.listItem}>
          <Text style={styles.text}>{event.location}</Text>
        </View>
      </TouchableOpacity>
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
      <DetailEventItem
        key="7"
        title={"Budget"}
        items={[event.budget]}
        onPress={() => {
          setBudgetModalVisible(!budgetModalVisible);
        }}
      />
    );
  };
  const eventScheduleComponent = () => {
    return (
      <DetailEventItem
        key="5"
        title={"Event schedule"}
        items={["Hupa", "Dancing"]}
        onPress={() => {}}
      />
    );
  };
  const suppliersComponent = () => {
    return (
      <DetailEventItem
        key="6"
        title={"Suppliers"}
        items={["DJ", "Photographer"]}
        onPress={() =>
          navigation.navigate("AllEventsSuppliers", {
            event: event,
          })
        }
      />
    );
  };

  const onSaveEvent = async () => {
    setIsLoading(true);
    let editEvent = new EditEventEntity(
      event.id,
      event.event_manager,
      event.type,
      event.event_name,
      event.date,
      event.budget,
      event.location
    );
    const urlEditEvent = base_url + getEvent(event.id);
    await fetchTimeout(
      urlEditEvent,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${myContext.token}`,
        },
        body: JSON.stringify(editEvent),
      },
      5000,
      "Timeout"
    )
      .then(async (res) => {
        const data = await res.json();
        if (STATUS_FAILED(res.status)) {
          const message = "data.Error";
          createOneButtonAlert(message, "OK", "EDIT event failed");
        } else if (STATUS_SUCCESS(res.status)) {
          // myContext.setRefresh(!myContext.refresh);
          const message = "event updated!";
          createOneButtonAlert(message, "OK", "", () => {
            myContext.setRefresh(!myContext.refresh);
            navigation.navigate("HomePage");
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
      });
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
          {ownersComponent()}
          {budgetComponent()}
          {eventScheduleComponent()}
          {suppliersComponent()}
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

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 25,
    textAlign: "center",
  },
  listItem: {
    backgroundColor: Colors.button_gray,
    borderRadius: 150,
    height: 40,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  text: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "center",
  },
  h1: {
    position: "relative",
    padding: 0,
    margin: 0,
    fontFamily: "alef-bold",
    fontWeight: "400",
    fontSize: 30,
    color: Colors.text_black,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonCancel: {
    backgroundColor: Colors.dark_gray,
  },
  buttonUpdate: {
    backgroundColor: Colors.darkseagreen,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    fontFamily: "alef-regular",
    fontSize: 14,
    height: 40,
    margin: 12,
    padding: 10,
    width: 250,
    backgroundColor: Colors.white,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  row: {
    width: 150,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    display: "flex",
  },
});

export default EventPage;
