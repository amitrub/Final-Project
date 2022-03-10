import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const TasksPreview = (props) => {
  //console.log("TasksPreview");
  return (
    <View style={styles.screen}>
      <Text
        style={styles.mainTitle}
        onPress={() => props.HomeProps.navigation.navigate("Tasks")}
      >
        My tasks
      </Text>
      <Text style={styles.mainTitle}>-- Events preview --</Text>
    </View>
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
});

export default TasksPreview;
