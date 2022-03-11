import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

const EventDateTitle = (props) => (
  <View style={styles.row}>
    <Text key="day1" style={styles.listItem}>
      {" "}
      {2}{" "}
    </Text>
    <Text key="day2" style={styles.listItem}>
      {" "}
      {3}{" "}
    </Text>
    <Text key="1" style={styles.slashh}>
      /
    </Text>
    <Text key="mon1" style={styles.listItem}>
      {" "}
      {0}{" "}
    </Text>
    <Text key="mon2" style={styles.listItem}>
      {" "}
      {9}{" "}
    </Text>
    <Text key="2" style={styles.slashh}>
      /
    </Text>
    <Text key="y1" style={styles.listItem}>
      {" "}
      {2}{" "}
    </Text>
    <Text key="y2" style={styles.listItem}>
      {" "}
      {0}{" "}
    </Text>
    <Text key="y3" style={styles.listItem}>
      {" "}
      {2}{" "}
    </Text>
    <Text key="y4" style={styles.listItem}>
      {" "}
      {2}{" "}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  slashh: {
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
    textAlign: "center",
  },
});
export default EventDateTitle;
