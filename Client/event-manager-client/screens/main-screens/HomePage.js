import React, {useContext, useEffect} from "react";
import {ScrollView, Text, View} from "react-native";
import MeetingsPreview from "../../components/HomePreview/MeetingsPreview";
import EventsPreview from "../../components/HomePreview/EventsPreview";
import TasksPreview from "../../components/HomePreview/TasksPreview";
import UserAuthentication from "../../global/UserAuthentication";
import Loader from "../../components/basicComponents/others/Loader";
import {getHomePageData, getIsEventManager,} from "../../api/HomePage/HomePageApi";
import {HomePageStyles} from "../../styles/styles";

const HomePage = () => {
    const myContext = useContext(UserAuthentication);
    const {refresh, isLoading, setIsLoading, error} = myContext;

    const [eventsPreview, setEventsPreview] = React.useState([]);

    useEffect(async () => {
        setIsLoading(true);
        await getIsEventManager(myContext);
        await getHomePageData(myContext, setEventsPreview);
    }, [refresh]);
    if (isLoading) return <Loader/>;


    return (
        <ScrollView>
            <View style={HomePageStyles.screen}>
                <View style={{marginTop: 100}}>
                    <Text style={HomePageStyles.mainTitle}>Hello {myContext.name}!</Text>
                </View>
                <View style={{paddingTop: "15%"}}>
                    <MeetingsPreview/>
                </View>
                <View style={{paddingTop: "7%"}}>
                    <EventsPreview events={eventsPreview}/>
                </View>
                <View style={{paddingTop: "7%"}}>
                    <TasksPreview/>
                </View>
            </View>
        </ScrollView>
    );
};

export default HomePage;
