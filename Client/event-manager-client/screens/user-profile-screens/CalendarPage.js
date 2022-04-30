import React, {useContext} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../../constants/colors";
import FullCalendar from '@fullcalendar/react'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import UserAuthentication from "../../global/UserAuthentication";

const CalendarPage = (props) => {
  const apiKey = "AIzaSyAtzlvC_Eum9C44wVSg-1m9rUnx5QL1xuA";
  const myContext = useContext(UserAuthentication);
  const calendarObjectExample = {
    day: 1, // day of month (1-31)
    month: 1, // month of year (1-12)
    year: 2017, // year
    timestamp: Date.now(), // UTC timestamp representing 00:00 AM of this date
    dateString: "2016-05-13", // date formatted as 'YYYY-MM-DD' string
  };
  const daySelected = {
    selected: true,
    marked: true,
    selectedColor: Colors.darkseagreen,
  };
  const [chosenDay, setChosenDay] = React.useState(null);
  const [markedDates, setMarkedDates] = React.useState({
    "2022-04-02": {
      selected: true,
      marked: true,
      selectedColor: Colors.darkseagreen,
    },
  });

  LocaleConfig.locales["en"] = {
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November ",
      "December",
    ],
    monthNamesShort: [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May.",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov. ",
      "Dec.",
    ],
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayNamesShort: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
    today: "today",
  };
  LocaleConfig.defaultLocale = "en";

  const onDayPressed = (dayPressed) => {
    setChosenDay(dayPressed);
    let tmpMarkedDates = markedDates;
    tmpMarkedDates[dayPressed.dateString] = daySelected;
    setMarkedDates(tmpMarkedDates);
  };
  const dayPresentation = () => {
    console.log("------------helllllo-------");
    console.log(myContext.isGoogle);
    return <Text>{JSON.stringify(chosenDay)}</Text>;
  };

  let calendars = [
    {
      calendarId: "reutlevy30@gmail.com",
      color: "#B241D1"
    }
  ];
  let styles = {
    calendar: {
      backgroundColor: "#1E1E1E",
      color: "white"
    },

    today: {
      color: "#4285F4"
    },
    eventText: {
      color: "white"
    }
  };

  return (
    <View>
      <View style={{ height: "80%" }}>
        {!myContext.isGoogle ? (
        <CalendarList
          markedDates={markedDates}
          onDayPress={(dayPressed) => onDayPressed(dayPressed)}
        />):(
            <Calendar
                apiKey={apiKey}
                styles={styles}
                calendars={calendars}
                showFooter={false}
                markedDates={markedDates}
            />
        )}
      </View>
      {dayPresentation()}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
  },
});

export default CalendarPage;
