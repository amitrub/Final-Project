import Log, { logApiRequest } from "../../constants/logger";
import {
    addEventOwner,
    allEvents,
    base_url,
    getEvent,
    postEventSchedule, register,
} from "../../constants/urls";
import {
  createOneButtonAlert,
  createTwoButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../constants/errorHandler";
import fetchTimeout from "fetch-timeout";
import EventScheduleEntity from "../../Entities/EventScheduleEntity";

export async function fetchEvent(myContext, setEvent, setIsLoading, setError) {
  let functionName = "fetchEvent";
  let url = base_url + getEvent(event_id);
  let request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${myContext.token}`,
    },
  };
  logApiRequest(functionName, url, request, myContext);
  await fetch(url, request, { timeout: 2000 })
    .then(async (res) => {
      const data = await res.json();
      setEvent(data);
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err);
      Log.error("EventPage >> getData >> error", err);
    });
}

export async function deleteEventRequest(myContext, event_id, navigation) {
  const { token, setIsLoading, setError, setRefresh } = myContext;
  let functionName = "deleteEventRequest";
  let url = base_url + getEvent(event_id);
  let request = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  logApiRequest(functionName, url, request, myContext);
  const onPressYes = async () => {
    setIsLoading(true);
    await fetch(url, request, { timeout: 2000 })
      .then(async (res) => {
        Log.info("EventPage >> delete event >> then");
        // const data = await res.json();
        createOneButtonAlert(
          "The event deleted successfully",
          "OK",
          "Delete event",
          () => {
            setRefresh(!myContext.refresh);
            navigation.pop();
            setIsLoading(false);
          }
        );
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        Log.error("EventPage >> delete event >> error", err);
      });
  };
  createTwoButtonAlert(
    "Are you sure you want to delete this event?",
    "Yes",
    "No",
    "Delete event",
    onPressYes
  );
}

export async function editEventRequest(
  myContext,
  editEvent,
  event_id,
  navigation
) {
  const { token, setIsLoading, setRefresh, setError } = myContext;
  let functionName = "editEventRequest";
  let url = base_url + getEvent(event_id);
  let request = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(editEvent),
  };
  setIsLoading(true);
  logApiRequest(functionName, url, request, myContext);
  await fetchTimeout(url, request, 5000, "Timeout")
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        const message = "data.Error";
        createOneButtonAlert(message, "OK", "EDIT event failed");
      } else if (STATUS_SUCCESS(res.status)) {
        // myContext.setRefresh(!myContext.refresh);
        const message = "event updated!";
        createOneButtonAlert(message, "OK", "", () => {
          setRefresh(!myContext.refresh);
          navigation.navigate("HomePage");
        });
      }
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err);
      Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
    });
}

export async function addEventOwnerRequest(myContext, event, navigation) {
  const { token, setIsLoading, setRefresh, setError } = myContext;
    let functionName = "addEventOwnerRequest";
    let url = base_url + allEvents;
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(event),
    };
    setIsLoading(true);
    logApiRequest(functionName, url, request, myContext);
  await fetchTimeout(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(event),
    },
    5000,
    "Timeout"
  )
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        const message = "data.Error";
        createOneButtonAlert(message, "OK", "Add new event failed");
      } else if (STATUS_SUCCESS(res.status)) {
        setRefresh(!myContext.refresh);
        const message =
          "The event was added successfully! \nGo watch your events";
        createOneButtonAlert(message, "OK", "ADD NEW EVENT", () =>
          navigation.navigate("AllEvents")
        );
      }
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err);
      Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
    });
}

export async function editEventOwnersRequest(
  myContext,
  editEvent,
  newOwners,
  navigation
) {
  const { token, setIsLoading, setError, setRefresh } = myContext;
  const urlEditEvent = base_url + getEvent(editEvent.id);
  const urlEditOwnerEvent = base_url + addEventOwner(editEvent.id);
    let functionName = "editEventOwnersRequest";
    let request = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${myContext.token}`,
        },
        body: JSON.stringify(editEvent),
    };
    setIsLoading(true);
    logApiRequest(functionName, urlEditEvent, request, myContext);
  await fetchTimeout(
    urlEditEvent,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${myContext.token}`,
      },
      body: JSON.stringify(editEvent),
    },
    5000,
    "Timeout"
  )
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        const message = "data.Error";
        createOneButtonAlert(message, "OK", "EDIT event failed");
      } else if (STATUS_SUCCESS(res.status)) {
        const ownersBody = JSON.stringify(
          newOwners.map((o) => {
            return { name: o.name, phone: o.phone };
          })
        );

          let functionName = "editEventOwnersRequest";
          let request = {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${token}`,
              },
              body: ownersBody,
          };
          setIsLoading(true);
          logApiRequest(functionName, urlEditEvent, request, myContext);
        await fetchTimeout(
          urlEditOwnerEvent,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: ownersBody,
          },
          5000,
          "Timeout"
        )
          .then(async (res) => {
            const data = await res.json();
            if (STATUS_FAILED(res.status)) {
              const message = data.toString();
              Log.error("add New Owner Request failed");
              createOneButtonAlert(
                "Owners didn't updated successfully! <" + message + ">",
                "OK",
                "Edit owners error!",
                () => navigation.pop()
              );
            } else if (STATUS_SUCCESS(res.status)) {
              setRefresh(!myContext.refresh);
              const message = "Owners updated!";
              createOneButtonAlert(message, "OK", "Yay", () =>
                navigation.pop()
              );
            }
          })
          .catch((err) => {
            setIsLoading(false);
            setError(err);
            Log.error(
              "AddEventOwner >> onSaveEvent >> failed with error: ",
              err
            );
          });
      }
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err);
      Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
      createOneButtonAlert(
        "owners didn't updated successfully - catch error: " + err,
        "OK",
        "Error - edit owners",
        () => navigation.pop()
      );
    });
}

export async function addEventScheduleRequest(
  myContext,
  eventId,
  meetingToAdd
) {
  const url = base_url + postEventSchedule(eventId);
  const { token, refresh, setRefresh, setError, setIsLoading } = myContext;
    let functionName = "addEventScheduleRequest";
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(meetingToAdd),
    };
    logApiRequest(functionName, url, request, myContext);
  await fetchTimeout(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(meetingToAdd),
    },
    5000,
    "Timeout"
  )
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        const message = "data.Error";
        createOneButtonAlert(
          message,
          "OK",
          "Add Event Schedule Request failed"
        );
      } else if (STATUS_SUCCESS(res.status)) {
        setRefresh(!refresh);
        const message = "Event Schedule was added successfully!";
        createOneButtonAlert(message, "OK", "ADD Event schedule", () => {});
      }
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err);
      Log.error("addEventScheduleRequest  >> failed with error: ", err);
    });
}

export async function getEventScheduleRequest(
  myContext,
  eventId,
  setEventSchedulesData,
  setEventSchedulesByDate
) {
  const { token, setError, setIsLoading } = myContext;
    let functionName = "getEventScheduleRequest";
    let request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    }
    const url = base_url + postEventSchedule(eventId);
    logApiRequest(functionName, url, request)
  await fetch(
    url,
    request,
    { timeout: 2000 }
  )
    .then(async (res) => {
      const data = await res.json();
      //console.log("data", data);

      const loadedEventSchedules = [];
      for (const key in data) {
        loadedEventSchedules.push(
          new EventScheduleEntity(
            data[key].start_time,
            data[key].end_time,
            data[key].description,
            data[key].event,
            data[key].id
          )
        );
      }

      setEventSchedulesData(loadedEventSchedules);

      let dict = {};
      loadedEventSchedules.forEach((eventSchedule) => {
        let date = eventSchedule.start_time.split("T")[0];
        if (dict.hasOwnProperty(date)) {
          let list = dict[date];
          list.push(eventSchedule);
          dict[date] = list;
        } else {
          dict[date] = [eventSchedule];
        }
      });
      setEventSchedulesByDate(dict);

      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err);
      Log.error("AllEventsSuppliers >> getData >> error", err);
    });
}
