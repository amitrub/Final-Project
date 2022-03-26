import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";
import Entypo from "react-native-vector-icons/Entypo";

const DetailEventItem = (props) => (
  <View>
    <View style={styles.icons}>
      <Entypo name="edit" size={16} />
      <Entypo name="plus" size={16} />
    </View>
    <View style={styles.listItem}>
      <Text>{props.title} </Text>
      <View style={styles.row}>
        {props.items.map((item, index) => (
          <View key={index} style={styles.listItemSmall}>
            <Text style={styles.whiteText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    backgroundColor: Colors.button_gray,
    borderRadius: 150,
    height: 70,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  icons: {
    marginRight: 240,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  listItemSmall: {
    backgroundColor: Colors.dark_gray,
    borderRadius: 150,
    height: 30,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteText: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "center",
    color: Colors.white,
  },
});
export default DetailEventItem;
