import { Pressable, Text } from "react-native";
import { EventPageStyles as styles } from "../../../styles/styles";
import React from "react";

const CancelModalButton = (closeModalFunc) => {
  return (
    <Pressable
      style={[styles.button, styles.buttonCancel]}
      onPress={closeModalFunc}
    >
      <Text style={styles.textStyle}>Cancel</Text>
    </Pressable>
  );
};

export default CancelModalButton;
