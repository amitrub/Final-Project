import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../../common/constants/colors";
import Entypo from "react-native-vector-icons/Entypo";

const DetailEventItem = (props) => {
  const onPressProp = props.onPress
    ? props.onPress
    : () => console.log("DetailEventItem didn't get onPressProp");
  const titleProp = props.title;
  const itemsProp = props.items;

  return (
    <TouchableOpacity style={{ padding: 10 }} onPress={onPressProp}>
      <View style={styles.listItem}>
        {/*<View style={styles.icons}>*/}
        {/*  <Entypo name="edit" size={16} />*/}
        {/*</View>*/}
        <Text style={{ fontFamily: "alef-regular", fontSize: 14, padding: 2 }}>
          {titleProp}{" "}
        </Text>
        <View style={styles.row}>
          {itemsProp?.map((item, index) => (
            <View key={index} style={styles.listItemSmall}>
              <Text style={styles.whiteText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    backgroundColor: Colors.button_gray,
    borderRadius: 150,
    height: 63,
    width: 270,
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
