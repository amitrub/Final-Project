import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/colors";
import  Icon  from 'react-native-vector-icons';


const EventDetailButton = (props) => (
  <View style={styles.listItem}>
    <Icon name="Edit"/>
    <Text>{props.title} </Text>
      {props.items.map(item =>  <Text key={item}>{item}</Text>)}
  </View>
);

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: Colors.button_gray,
    borderRadius: 150,
    height: 48,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default EventDetailButton;
