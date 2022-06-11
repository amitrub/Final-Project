import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import MeetingsPreview from "../../components/HomePreview/MeetingsPreview";
import EventsPreview from "../../components/HomePreview/EventsPreview";
import TasksPreview from "../../components/HomePreview/TasksPreview";
import UserAuthentication from "../../global/UserAuthentication";
import Loader from "../../components/basicComponents/others/Loader";
import {
  getHomePageData,
  getIsEventManager,
} from "../../api/HomePage/HomePageApi";
import { HomePageStyles } from "../../styles/styles";
import { getEventScheduleByUserId } from "../../api/Calendar/CalendarPageApi";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
  const myContext = useContext(UserAuthentication);
  const navigation = useNavigation();
  const { name, refresh, isLoading, setIsLoading } = myContext;

  const [eventsPreview, setEventsPreview] = React.useState([]);
  const [fetchedEventSchedules, setFetchedEventSchedules] = useState([]);

  useEffect(async () => {
    setIsLoading(true);
    await getIsEventManager(myContext);
    await getHomePageData(myContext, setEventsPreview);
    await getEventScheduleByUserId(myContext, setFetchedEventSchedules);
  }, [refresh]);
  if (isLoading) return <Loader />;


  return (
    <ScrollView>
      <View style={HomePageStyles.screen}>
        <View style={{ marginTop: 100 }}>
          <Text style={HomePageStyles.mainTitle}>Hello {name}!</Text>
        </View>
        <View style={{ paddingTop: "15%" }}>
          <MeetingsPreview eventStages={fetchedEventSchedules} />
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
