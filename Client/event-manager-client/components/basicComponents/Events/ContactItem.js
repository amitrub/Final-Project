import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../../constants/colors";
import Entypo from "react-native-vector-icons/Entypo";

const ContactItem = (props) => {
  const contact = props.contact;

  const ownerItem = () => (
    <TouchableOpacity
      style={styles.listOwnerItem}
      onPress={() => props.onPress(contact)}
    >
      <Entypo name="user" size={16} />
      <Text style={styles.text}>{contact.name}</Text>
      <Entypo name="minus" size={16} />
    </TouchableOpacity>
  );

  const contactItem = () => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => props.onPress(contact)}
    >
      <Entypo name="user" size={16} />
      <Text style={styles.text}>{contact.name}</Text>
      <Entypo name="plus" size={16} />
    </TouchableOpacity>
  );

  return contact.isOwner ? ownerItem() : contactItem();
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 6,
    backgroundColor: Colors.button_gray,
    borderRadius: 18,
    height: 40,
    width: 250,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 0,
    display: "flex",
  },
  listOwnerItem: {
    padding: 10,
    marginVertical: 6,
    backgroundColor: Colors.darkseagreen,
    borderRadius: 18,
    height: 40,
    width: 250,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 0,
    display: "flex",
  },
  text: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "left",
  },
});

export default ContactItem;
