import { Pressable, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

const IconButton = (props) => {
  const disabled = props.disabled === undefined ? false : props.disabled;

  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => (pressed || disabled) && styles.pressed}
      disabled={disabled}
    >
      <View style={styles.button}>
        <Entypo name={props.icon} size={props.iconSize} color={props.color} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  button: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: Colors.button_gray,
    height: 35,
    width: 91,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
