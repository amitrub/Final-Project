import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import MeetingsPreview from "../../components/HomePreview/MeetingsPreview";
import EventsPreview from "../../components/HomePreview/EventsPreview";
import TasksPreview from "../../components/HomePreview/TasksPreview";
import Entypo from "react-native-vector-icons/Entypo";
import UserAuthentication from "../../global/UserAuthentication";
import Loader from "../../components/basicComponents/others/Loader";
import ErrorScreen, {
  ErrorMessages,
} from "../../components/basicComponents/others/ErrorScreen";
import { getHomePageData, getIsEventManager } from '../../api/HomePage/HomePage'
import {HomePageStyles} from "../../Styles/HomePage";

const HomePage = () => {
  const myContext = useContext(UserAuthentication);
  const refresh = myContext.refresh;

  const [eventsPreview, setEventsPreview] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    setIsLoading(true);
    await getIsEventManager(myContext);
    await getHomePageData(myContext, setEventsPreview, setIsLoading);
  }, [refresh]);
  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.Fetching} />;


  return (
    <ScrollView>
      <View style={HomePageStyles.screen}>
        <View style={HomePageStyles.row}>
          <Text style={HomePageStyles.mainTitle}>Hello {myContext.name}!</Text>
          <Entypo name="plus" size={20} />
        </View>
        <View style={{ paddingTop: "15%" }}>
          <MeetingsPreview />
        </View>
        <View style={{ paddingTop: "7%" }}>
          <EventsPreview events={eventsPreview} />
        </View>
        <View style={{ paddingTop: "7%" }}>
          <TasksPreview />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;
