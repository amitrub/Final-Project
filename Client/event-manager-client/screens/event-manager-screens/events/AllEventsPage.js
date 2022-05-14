import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import EventItem from "../../../components/basicComponents/Events/EventItem";
import Entypo from "react-native-vector-icons/Entypo";
import UserAuthentication from "../../../global/UserAuthentication";
import Log from "../../../constants/logger";
import { AllEventsPageStyles as styles } from "../../../styles/styles";
import { fetchAllEvents } from "../../../api/AllEventsPage/AllEventsPageApi";
import { handleError, handleLoading } from "../../../validations/validations";

const AllEventsPage = (props) => {
  const myContext = useContext(UserAuthentication);
  const { refresh } = myContext;
  const [allEventsData, setAllEventsData] = useState([]);

  useEffect(() => {
    fetchAllEvents(myContext, setAllEventsData)
      .then((res) => res)
      .catch((error) => Log.Error(error));
  }, [refresh]);

  const body = (
    <ScrollView>
      {allEventsData?.map((previewEvent, index) => {
        return <EventItem key={index} event={previewEvent} />;
      })}
    </ScrollView>
  );
  const AllEventsTitle = (
    <View style={styles.row}>
      <Text style={styles.mainTitle}>All Events</Text>
      <Entypo
        name="plus"
        size={24}
        onPress={() => props.navigation.navigate("AddEventDetails")}
      />
    </View>
  );
  //todo
  handleLoading();
  handleError();
  return (
    <View style={styles.screen}>
      {AllEventsTitle}
      {body}
    </View>
  );
};

export default AllEventsPage;
