import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";

const DateTitle = (props) => {
  const date = props.date;
  const listItem = props.isSmall ? styles.listItemSmall : styles.listItemBig;
  const my_slash = props.isSmall ? styles.my_slashSmall : styles.my_slashBig;

  return (
    <View style={styles.row}>
      <Text key="day1" style={listItem}>
        {date?.[8]}
      </Text>

      <Text key="day2" style={listItem}>
        {props.date?.[9]}
      </Text>
      <Text key="1" style={my_slash}>
        /
      </Text>
      <Text key="mon1" style={listItem}>
        {props.date?.[5]}
      </Text>
      <Text key="mon2" style={listItem}>
        {props.date?.[6]}
      </Text>
      <Text key="2" style={my_slash}>
        /
      </Text>
      <Text key="y1" style={listItem}>
        {date?.[0]}
      </Text>
      <Text key="y2" style={listItem}>
        {date?.[1]}
      </Text>
      <Text key="y3" style={listItem}>
        {date?.[2]}
      </Text>
      <Text key="y4" style={listItem}>
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
  listItemBig: {
    marginRight: 10,
    backgroundColor: Colors.button_gray,
    height: 40,
    width: 30,
    fontWeight: "bold",
    fontSize: 28,
    fontFamily: "alef-regular",
    textAlign: "center",
  },
  my_slashBig: {
    height: 40,
    fontWeight: "bold",
    fontSize: 30,
    width: 20,
  },
  listItemSmall: {
    marginRight: 10,
    backgroundColor: Colors.button_gray,
    height: 30,
    width: 20,
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "alef-regular",
    textAlign: "center",
  },
  my_slashSmall: {
    height: 30,
    fontWeight: "bold",
    fontSize: 20,
    width: 10,
  },
});
export default DateTitle;
