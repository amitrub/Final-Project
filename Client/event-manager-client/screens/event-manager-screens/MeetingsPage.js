import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../../constants/colors";
import SelectDropdown from "react-native-select-dropdown";
import BodyText from "../../components/basicComponents/BodyText";

const renderListItem = ({ item }) => {
  return (
    <View style={styles.listItem}>
      <BodyText>{item}</BodyText>
    </View>
  );
};

const MeetingsPage = (props) => {
  const testEvents = [
    { eventName: "event1", meetings: ["e1m1", "e1m2", "e1m3"] },
    { eventName: "event2", meetings: ["e2m1", "e2m2", "e2m3"] },
    { eventName: "event3", meetings: ["e3m1", "e3m2", "e3m3"] },
  ];
  const [events, onChangeEvents] = React.useState(testEvents);
  const [meetings, onChangeMeetings] = React.useState([]);

  return (
    <View>
      <View style={styles.screen}>
        <Text>MeetingsPage</Text>
        <Text>Choose Event:</Text>
        <SelectDropdown
          data={events}
          onSelect={(selectedItem, index) => {
            //console.log(selectedItem, index);
            onChangeMeetings(selectedItem.meetings);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.eventName;
          }}
          rowTextForSelection={(item, index) => {
            return item.eventName;
          }}
        />
      </View>

      <View>
        <FlatList
          keyExtractor={(item) => item}
          data={meetings}
          renderItem={renderListItem}
          // contentContainerStyle={styles.list}
        />
      </View>
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
  list: {
    // flexGrow: 1,
    // // alignItems: 'center',
    // justifyContent: "flex-end",
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: Colors.button_gray,
    // borderColor: "black",
    // borderWidth: 1,
    borderRadius: 150,
    height: 48,
    width: 240,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MeetingsPage;
