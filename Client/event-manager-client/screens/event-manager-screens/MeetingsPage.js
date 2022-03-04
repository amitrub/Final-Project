import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../../constants/colors";
import SelectDropdown from "react-native-select-dropdown";
import ItemListButton from "../../components/basicComponents/ItemListButton";



const MeetingsPage = (props) => {
  const testEvents = [
    {  eventName: "event1", meetings: ["הדס ורועי - חתונה", "אור ורוני- חתונה", "בריגיט ותום - ברית", "a", "b", "c", "d", "e", "f", "g", "h", "i", "k", "l", "m", "p"] },
    {  eventName: "event2", meetings: ["e2m1", "e2m2", "e2m3"] },
  ];
  const [events, onChangeEvents] = React.useState(testEvents);
  const [meetings, onChangeMeetings] = React.useState([]);

  const renderListItem = ({ item }) => {
  return (
    <View style={styles.listItem}>
      <ItemListButton text={item} navi={props.navigation}/>
    </View>
  );
};

  return (
    <View style={styles.screen}>
      <View >
        <Text>MeetingsPage</Text>
        <Text>Choose Event:</Text>
        <SelectDropdown
          data={events}
          onSelect={(selectedItem, index) => {
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

export default MeetingsPage;
