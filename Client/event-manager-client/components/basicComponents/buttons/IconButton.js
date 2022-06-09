import { Pressable, Text, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

const IconButton = (props) => {
  const disabled = props.disabled ? props.disabled : false;
  const iconButtonStyle = props.width
    ? [styles.button, { width: props.width }]
    : styles.button;
  const icon = props.width ? undefined : (
    <Entypo name={props.icon} size={props.iconSize} color={props.color} />
  );

  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => (pressed || disabled) && styles.pressed}
      disabled={disabled}
    >
      <View style={iconButtonStyle}>
        {icon}
        {props.textButton ? <Text>{props.textButton}</Text> : undefined}
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
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
