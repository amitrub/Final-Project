import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import Colors from "../../constants/colors";
import Loader from "../../components/basicComponents/others/Loader";
import ErrorScreen, {
  ErrorMessages,
} from "../../components/basicComponents/others/ErrorScreen";
import DatePickerInput from "../../components/basicComponents/inputs/DatePickerInput";
import DateTitle from "../../components/basicComponents/others/DateTitle";
import IconButton from "../../components/basicComponents/buttons/IconButton";
import EventEntity from "../../Entities/EventEntity";
import UserAuthentication from "../../global/UserAuthentication";
import DropdownComponent from "../../components/basicComponents/inputs/DropdownComponent";

const AddEventDetails = (props) => {
  const myContext = useContext(UserAuthentication);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.ImportContacts} />;

  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState(0);

  const onPressNext = () => {
    let event = new EventEntity(
      0,
      myContext.id,
      type,
      [],
      eventName,
      date,
      budget,
      location,
      [],
      []
    );
    console.log(event);
    props.navigation.navigate("AddEventOwners", {
      event: event,
    });
  };

  return (
    <ScrollView>
      <View style={[styles.screen]}>
        <View style={{ paddingTop: 60 }}>
          <DropdownComponent label={"event type"} onPress={setType} />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setEventName}
          value={eventName}
          placeholder={"Event's Name"}
        />
        <DatePickerInput date={date} setDate={setDate} />
        <DateTitle date={date} />
        <View style={{ paddingTop: "10%" }}>
          <TextInput
            style={styles.input}
            onChangeText={setLocation}
            value={location}
            placeholder={"Location"}
          />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setBudget}
          value={budget}
          placeholder={"Budget"}
          keyboardType="numeric"
        />
        <View style={{ marginTop: 40 }}>
          <IconButton
            onPress={onPressNext}
            icon={"chevron-thin-right"}
            color={Colors.black}
            iconSize={16}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    paddingBottom: 120,
  },
  screen: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
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
  text: {
    fontSize: 20,
    color: "#101010",
    marginTop: 60,
    fontWeight: "700",
  },
  input: {
    fontFamily: "alef-regular",
    fontSize: 14,
    height: 40,
    margin: 12,
    padding: 10,
    width: 250,
    backgroundColor: Colors.background_gray,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
});

export default AddEventDetails;
