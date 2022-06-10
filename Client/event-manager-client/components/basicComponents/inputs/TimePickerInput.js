import React from "react";
import { SafeAreaView, StyleSheet, View, Pressable } from "react-native";
import DatePicker from "react-native-datepicker";
import Colors from "../../../constants/colors";

const TimePickerInput = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Pressable>
          <DatePicker
            style={styles.datePickerStyle}
            date={props.time}
            mode="time"
            placeholder={props.placeholder}
            // locale="en_GB"
            // format="HH-"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                right: -5,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                alignItems: "flex-start",
                borderWidth: 0,
                borderBottomWidth: 0,
              },
              placeholderText: {
                fontSize: 17,
                color: "gray",
              },
              dateText: {
                fontSize: 17,
                color: Colors.dark_gray,
              },
            }}
            onDateChange={(time) => props.setTime(time)}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default TimePickerInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 1,
    // backgroundColor: "#A8E9CA",
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  datePickerStyle: {
    width: 180,
  },
  text: {
    textAlign: "left",
    width: 230,
    fontSize: 16,
    // color: "#000",
  },
});
