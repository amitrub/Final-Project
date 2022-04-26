import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import Entypo from "react-native-vector-icons/Entypo";
import MeetingItem from "../basicComponents/MeetingItem";
import { useNavigation } from "@react-navigation/native";
import {TasksPreviewStyles} from "../../Styles/styles";

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
      <MeetingItem location={"Choosing Hupa song"} time={""} description={""} />
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
