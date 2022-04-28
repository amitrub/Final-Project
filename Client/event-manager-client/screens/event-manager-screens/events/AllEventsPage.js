import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import EventItem from "../../../components/basicComponents/Events/EventItem";
import Entypo from "react-native-vector-icons/Entypo";
import UserAuthentication from "../../../global/UserAuthentication";
import Loader from "../../../components/basicComponents/others/Loader";
import ErrorScreen, {
  ErrorMessages,
} from "../../../components/basicComponents/others/ErrorScreen";
import Log from "../../../constants/logger";
import { AllEventsPageStyles as styles } from '../../../Styles/styles'
import {fetchAllEvents} from "../../../api/AllEventsPage/AllEventsPageApi";

const AllEventsPage = (props) => {
  const myContext = useContext(UserAuthentication);
  const refresh = myContext.refresh;
  const [allEventsData, setAllEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchAllEvents(myContext, setAllEventsData, setIsLoading, setError)
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
  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.Fetching} />;

  return (
    <View style={styles.screen}>
      {AllEventsTitle}
      {body}
    </View>
  );
};

export default AllEventsPage;
