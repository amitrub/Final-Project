import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../constants/colors";
import MeetingsPreview from "../../components/HomePreview/MeetingsPreview";
import EventsPreview from "../../components/HomePreview/EventsPreview";
import TasksPreview from "../../components/HomePreview/TasksPreview";
import Entypo from "react-native-vector-icons/Entypo";
import UserAuthentication from "../../global/UserAuthentication";
import { base_url, eventManager, login } from "../../constants/urls";
import {
  createOneButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../constants/errorHandler";

const HomePage = (props) => {
  const myContext = useContext(UserAuthentication);
  console.log("myContext homepage", myContext);

  async function postEventManager() {
    await fetch(base_url + eventManager(myContext.id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${myContext.token}`,
      },
    })
      .then(async (res) => {
        try {
          const data = await res.json();
          if (STATUS_FAILED(res.status)) {
            console.log("POST is-event-manager FAILED");
          } else if (STATUS_SUCCESS(res.status)) {
            console.log("POST is-event-manager SUCCESS");
          }
        } catch (error) {
          console.log("postEventManager error", error);
        }
      })
      .catch((error) => console.log("postEventManager catch error", error));
  }
  async function getIsEventManager() {
    await fetch(base_url + eventManager(myContext.id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${myContext.token}`,
      },
    })
      .then(async (res) => {
        try {
          const data = await res.json();
          if (STATUS_FAILED(res.status)) {
            console.log("GET is-event-manager FAILED");
          } else if (STATUS_SUCCESS(res.status)) {
            if (!data.is_event_manager) {
              await postEventManager();
            } else {
              console.log(
                "GET is-event-manager SUCCESS >> already event-manager"
              );
            }
          }
        } catch (error) {
          console.log("GET is-event-manager catch error", error);
        }
      })
      .catch((error) => console.log("onPressRegister error", error));
  }

  useEffect(async () => {
    await getIsEventManager();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.row}>
          <Text style={styles.mainTitle}>Hello Hadasi Hayafa</Text>
          <Entypo name="plus" size={20} />
        </View>
        <View style={{ paddingTop: "7%" }}>
          <MeetingsPreview HomeProps={props} />
        </View>
        <View style={{ paddingTop: "7%" }}>
          <EventsPreview HomeProps={props} />
        </View>
        <View style={{ paddingTop: "7%" }}>
          <TasksPreview HomeProps={props} />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 30,
    width: 400,
  },
});

export default HomePage;
