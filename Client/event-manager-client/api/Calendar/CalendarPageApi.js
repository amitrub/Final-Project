import { allEvents, base_url, eventSchedulesById } from "../../constants/urls";
import { STATUS_FAILED, STATUS_SUCCESS } from "../../constants/errorHandler";
import Log, { logApiRequest } from "../../constants/logger";
import { logAndCreateErrorMessage } from "../../validations/validations";

export async function getEventScheduleByUserId(
  myContext,
  setFetchedEventSchedules
) {
  const { id, token, setIsLoading } = myContext;
  setIsLoading(true);

  let functionName = "Get Event Schedule By UserId";
  let url = base_url + eventSchedulesById(id);
  let request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  logApiRequest(functionName, url, request, myContext);
  await fetch(url, request, { timeout: 2000 })
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        logAndCreateErrorMessage(data, functionName);
      } else if (STATUS_SUCCESS(res.status)) {
        Log.info(
          "CalendarPageApi >> getEventScheduleByUserId >> status success"
        );

        let dict = {};
        data.event_schedules.forEach((eventSchedule) => {
          let date = eventSchedule.start_time.split("T")[0];
          if (dict.hasOwnProperty(date)) {
            let list = dict[date];
            list.push(eventSchedule);
            dict[date] = list;
          } else {
            dict[date] = [eventSchedule];
          }
        });

        setFetchedEventSchedules(dict);
        setIsLoading(false);
      }
    })
    .catch((error) => console.log("onPressRegister error", error));
}

export async function getEventsByUserId(myContext, setFetchedEvents) {
  const { token, setIsLoading } = myContext;
  setIsLoading(true);

  let functionName = "Get Events By User Id";
  let url = base_url + allEvents;
  console.log(url);
  let request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  logApiRequest(functionName, url, request, myContext);
  await fetch(url, request, { timeout: 2000 })
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        logAndCreateErrorMessage(data, functionName);
      } else if (STATUS_SUCCESS(res.status)) {
        Log.info("CalendarPageApi >> getEventsByUserId >> status success");

        let dict = {};
        data.forEach((event) => {
          if (dict.hasOwnProperty(event.date)) {
            let list = dict[event.date];
            list.push(event);
            dict[event.date] = list;
          } else {
            dict[event.date] = [event];
          }
        });

        setFetchedEvents(dict);
        setIsLoading(false);
      }
    })
    .catch((error) => console.log("onPressRegister error", error));
}
