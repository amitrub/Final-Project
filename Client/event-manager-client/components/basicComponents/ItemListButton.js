import React from "react";
import { Text, View } from "react-native";

const ItemListButton = (props) => (
  <View>
    <Text onPress={() => {
        props.navi.navigate("Meeting");
      }}>{props.text} </Text>
  </View>
);

export default ItemListButton;
