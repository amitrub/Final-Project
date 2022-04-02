import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";

const DateTitle = (props) => {
  const date = props.date;
  return (
    <View style={styles.row}>
      <Text key="day1" style={styles.listItem}>
        {date?.[8]}
      </Text>

      <Text key="day2" style={styles.listItem}>
        {props.date?.[9]}
      </Text>
      <Text key="1" style={styles.my_slash}>
        /
      </Text>
      <Text key="mon1" style={styles.listItem}>
        {props.date?.[5]}
      </Text>
      <Text key="mon2" style={styles.listItem}>
        {props.date?.[6]}
      </Text>
      <Text key="2" style={styles.my_slash}>
        /
      </Text>
      <Text key="y1" style={styles.listItem}>
        {date?.[0]}
      </Text>
      <Text key="y2" style={styles.listItem}>
        {date?.[1]}
      </Text>
      <Text key="y3" style={styles.listItem}>
        {date?.[2]}
      </Text>
      <Text key="y4" style={styles.listItem}>
        {date?.[3]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  my_slash: {
    borderRadius: 150,
    height: 40,
    fontWeight: "bold",
    fontSize: 30,
    width: 20,
  },
  listItem: {
    marginRight: 10,
    backgroundColor: Colors.button_gray,
    // borderRadius: 150,
    height: 40,
    width: 30,
    fontWeight: "bold",
    fontSize: 28,
    fontFamily: "alef-regular",
    textAlign: "center",
  },
});
export default DateTitle;
