import React from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ItemListButton = (props) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text
        onPress={() => {
          navigation.navigate("Meeting");
        }}
      >
        {props.text}{" "}
      </Text>
    </View>
  );
};

export default ItemListButton;
