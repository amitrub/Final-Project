import {StyleSheet, Text} from "react-native";
import React from "react";

const TextTitle = (props) =>
    <Text style={styles.textTitle}>{props.text}</Text>


const styles = StyleSheet.create({
    textTitle: {
        fontFamily: "alef-regular",
        fontSize: 14,
        textAlign: "left",
        marginBottom: 10
    },
});

export default TextTitle;