import React, { useContext, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import Colors from "../../common/constants/colors";
import Loader from "../../lindsly-style-react/components/others/Loader";
import DatePickerInput from "../../lindsly-style-react/components/inputs/DatePickerInput";
import DateTitle from "../../lindsly-style-react/components/others/DateTitle";
import IconButton from "../../lindsly-style-react/components/buttons/IconButton";
import EventEntity from "../../common/Entities/EventEntity";
import UserAuthentication from "../../common/global/UserAuthentication";
import DropdownComponent from "../../lindsly-style-react/components/inputs/DropdownComponent";
import { AddEventDetailsStyles as styles } from "../../lindsly-style-react/styles/styles";
import { isNotValidAddEventInput } from "../../common/validations/validations";
import { createOneButtonAlert } from "../../common/constants/errorHandler";

const AddEventDetails = (props) => {
  const myContext = useContext(UserAuthentication);
  const { isLoading } = myContext;

  if (isLoading) return <Loader />;

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
        <DateTitle date={date} isSmall={true} />
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
