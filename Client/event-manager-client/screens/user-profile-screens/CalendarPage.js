import React, { useCallback, useContext, useEffect } from "react";
import { View } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import EventMeetingItem from "../../components/basicComponents/EventMeetingItem";
import { getEventScheduleByUserId } from "../../api/Calendar/CalendarPageApi";
import UserAuthentication from "../../global/UserAuthentication";
import Loader from "../../components/basicComponents/others/Loader";
import ErrorScreen, {
  ErrorMessages,
} from "../../components/basicComponents/others/ErrorScreen";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};
const formatDate = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const CalendarPage = (props) => {
  const myContext = useContext(UserAuthentication);
  const { id, token, isLoading, setIsLoading, error, setError, refresh } =
    myContext;
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
  const [items, setItems] = React.useState({});
  const [fetchedEventSchedules, setFetchedEventSchedules] = React.useState({});

  useEffect(async () => {
    await getEventScheduleByUserId(myContext, setFetchedEventSchedules);
  }, [id]);
  const loadItems = useCallback(
    async (day) => {
      const items = fetchedEventSchedules;

      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);

          if (!items[strTime]) {
            items[strTime] = [];
          }
        }

        const newItems = {};
        Object.keys(items).forEach((key) => {
          newItems[key] = items[key];
        });
        setItems(newItems);
      }, 1000);
    },
    [refresh]
  );
  const renderItem = (item) => {
    return <EventMeetingItem item={item} />;
  };
  const getAgendaComponent = () => {
    const today = formatDate(Date.now(), "yyyy-mm-dd");
    return (
      <View style={{ height: "98%" }}>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={today}
          minDate={"2022-01-01"}
          maxDate={"2025-05-30"}
          renderItem={renderItem}
          renderEmptyDate={() => {
            return <View />;
          }}
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text;
          }}
          // showClosingKnob={true}
          // markingType={'period'}
          // markedDates={{
          //    '2017-05-08': {textColor: '#43515c'},
          //    '2017-05-09': {textColor: '#43515c'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2017-05-21': {startingDay: true, color: 'blue'},
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}}}
          // monthFormat={'yyyy'}
          // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          // hideExtraDays={false}
          // showOnlySelectedDayItems
        />
      </View>
    );
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.Fetching} />;
  return <View>{getAgendaComponent()}</View>;
};

export default CalendarPage;

// const calendarObjectExample = {
//   day: 1, // day of month (1-31)
//   month: 1, // month of year (1-12)
//   year: 2017, // year
//   timestamp: Date.now(), // UTC timestamp representing 00:00 AM of this date
//   dateString: "2016-05-13", // date formatted as 'YYYY-MM-DD' string
// };
// const daySelected = {
//   selected: true,
//   marked: true,
//   selectedColor: Colors.darkseagreen,
// };
// const [chosenDay, setChosenDay] = React.useState(null);
// const [markedDates, setMarkedDates] = React.useState({
//   "2022-04-02": {
//     selected: true,
//     marked: true,
//     selectedColor: Colors.darkseagreen,
//   },
// });
// const onDayPressed = (dayPressed) => {
//   setChosenDay(dayPressed);
//   let tmpMarkedDates = markedDates;
//   tmpMarkedDates[dayPressed.dateString] = daySelected;
//   setMarkedDates(tmpMarkedDates);
// };
// const getCalendarListComponent = () => {
//   return (
//     <View style={{ height: "80%" }}>
//       <CalendarList
//         markedDates={markedDates}
//         onDayPress={(dayPressed) => onDayPressed(dayPressed)}
//       />
//     </View>
//   );
// };
