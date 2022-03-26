import { Pressable } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { StyleSheet } from "react-native";

const IconButton = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Entypo name={props.icon} size={24} color={props.color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
