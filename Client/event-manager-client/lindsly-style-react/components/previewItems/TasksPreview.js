import React from "react";
import { View, Text } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MeetingItem from "../calendarItems/MeetingItem";
import { useNavigation } from "@react-navigation/native";
import { TasksPreviewStyles } from "../../styles/styles";

const TasksPreview = () => {
  const navigation = useNavigation();

  const previewTitle = (
    <View style={TasksPreviewStyles.row}>
      <Text style={TasksPreviewStyles.textTitle}>Today's tasks</Text>
      <Entypo
        name="dots-three-horizontal"
        size={22}
        onPress={() => navigation.navigate("Tasks")}
      />
    </View>
  );
  const body = (
    <View>
      <MeetingItem
        description={"To do something"}
        key={0}
        time={"10:00"}
        eventName={"Task 1"}
        date={"22.22.22"}
      />
    </View>
  );

  return (
    <View style={TasksPreviewStyles.screen}>
      {previewTitle}
      {body}
    </View>
  );
};

export default TasksPreview;
