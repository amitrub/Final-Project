import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../../constants/colors";
import Entypo from "react-native-vector-icons/Entypo";

const DetailSupplierItem = (props) => {
  const onPressProp = props.onPress
    ? props.onPress
    : () => console.log("DetailSupplierItem didn't get onPressProp");
  const titleProp = props.title;
  const valueProp = props.value;

  return (
    <TouchableOpacity style={{ padding: 10 }} onPress={onPressProp}>
      <View style={styles.listItem}>
        <Text style={{ fontFamily: "alef-regular", fontSize: 16 }}>
          {titleProp}{" "}
        </Text>
        <Text
          style={{
            fontFamily: "alef-regular",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {valueProp}{" "}
        </Text>
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
    borderRadius: 24,
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
export default DetailSupplierItem;
