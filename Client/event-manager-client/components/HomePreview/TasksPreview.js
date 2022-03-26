import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import Entypo from "react-native-vector-icons/Entypo";
import MeetingItem from "../basicComponents/MeetingItem";
import { useNavigation } from "@react-navigation/native";

const TasksPreview = (props) => {
  const navigation = useNavigation();

  const previewTitle = (
    <View style={styles.row}>
      <Text style={styles.textTitle}>Today's tasks</Text>
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
    <View style={styles.screen}>
      {previewTitle}
      {body}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    display: "flex",
  },
});

export default TasksPreview;
