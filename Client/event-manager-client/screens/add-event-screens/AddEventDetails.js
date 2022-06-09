import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
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
import { AddEventDetailsStyles as styles } from "../../styles/styles";
import {
  handleError,
  handleLoading,
  isNotValidAddEventInput,
} from "../../validations/validations";
import { createOneButtonAlert } from "../../constants/errorHandler";

const AddEventDetails = (props) => {
  const myContext = useContext(UserAuthentication);
  const { isLoading, error } = myContext;

  // handleLoading();
  // handleError();
  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.ImportContacts} />;

  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

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
    if (isNotValidAddEventInput(event)) {
      createOneButtonAlert(
        "please fill all event properties",
        "OK",
        "Failed..."
      );
    } else {
      props.navigation.navigate("AddEventOwners", {
        event: event,
      });
    }
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
          maxLength={30}
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

export default AddEventDetails;
