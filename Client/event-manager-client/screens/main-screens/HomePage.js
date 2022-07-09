import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import MeetingsPreview from "../../lindsly-style-react/components/previewItems/MeetingsPreview";
import EventsPreview from "../../lindsly-style-react/components/previewItems/EventsPreview";
import TasksPreview from "../../lindsly-style-react/components/previewItems/TasksPreview";
import UserAuthentication from "../../common/global/UserAuthentication";
import Loader from "../../lindsly-style-react/components/others/Loader";
import {
  getHomePageData,
  getIsEventManager,
} from "../../common/api/HomePage/HomePageApi";
import { HomePageStyles } from "../../lindsly-style-react/styles/styles";
import { getEventScheduleByUserId } from "../../common/api/Calendar/CalendarPageApi";
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
