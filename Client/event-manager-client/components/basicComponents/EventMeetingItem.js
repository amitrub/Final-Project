import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { EventScheduleStyle } from "../../Styles/styles";

const EventMeetingItem = (props) => {
    function getNameLetters(name) {
        let splitName = name?.split(" ");
        if (!splitName) return "";
        if (splitName.length < 2) {
            return "XX";
        }
        return splitName[0][0].toUpperCase() + splitName[1][0].toUpperCase();
    }
    const item = props.item;

    if (!item) {
        return <Text>"Item didn't send as prop!"</Text>;
    }
    return (
        <TouchableOpacity
            style={{
                marginRight: 10,
                marginTop: 17,
            }}
        >
            <Card>
                <Card.Content>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View>
                            <View style={{ paddingBottom: 5 }}>
                                <Text style={EventScheduleStyle.timeText}>
                                    {item.startTime}-{item.endTime}
                                </Text>
                            </View>
                            <Text style={EventScheduleStyle.nameText}>{item.name}</Text>
                            <Text style={EventScheduleStyle.descriptionText}>
                                {item.description}
                            </Text>
                        </View>
                        <Avatar.Text
                            label={getNameLetters(item.name)}
                            backgroundColor={
                                "#" + Math.floor(Math.random() * 16777215).toString(16)
                            }
                        />
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

export default EventMeetingItem;
