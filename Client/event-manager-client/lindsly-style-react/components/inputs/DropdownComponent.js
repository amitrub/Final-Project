import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../../../common/constants/colors";

const data = [
  { label: "Wedding", value: "Wedding" },
  { label: "Bar/Bat Mitzva", value: "Bar Mitzva" },
  { label: "Birthday", value: "Birthday" },
  { label: "Baby Shower", value: "Baby Shower" },
  { label: "Show", value: "Show" },
  { label: "Concert", value: "Concert" },
  { label: "Sport event", value: "Sport event" },
  { label: "Social event", value: "Social event" },
  { label: "Other", value: "Other" },
];

const DropdownComponent = (props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "black" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Event's type" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          props.onPress(item.value);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: 290,
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 8,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    left: 22,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontFamily: "alef-regular",
    fontSize: 14,
    color: Colors.html_Silver,
  },
  selectedTextStyle: {
    fontFamily: "alef-regular",
    fontSize: 14,
  },
  inputSearchStyle: {
    height: 40,
    fontFamily: "alef-regular",
    fontSize: 14,
  },
});
