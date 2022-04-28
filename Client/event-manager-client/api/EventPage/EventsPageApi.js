import Log from "../../constants/logger";
import {base_url, getEvent} from "../../constants/urls";
import {createOneButtonAlert, createTwoButtonAlert, STATUS_FAILED, STATUS_SUCCESS} from "../../constants/errorHandler";
import fetchTimeout from "fetch-timeout";

export async function fetchEvent (myContext, setEvent, setIsLoading, setError) {
    const url = base_url + getEvent(event_id);
    await fetch(
            url,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${myContext.token}`,
              },
            },
            { timeout: 2000 }
          )
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

export async function deleteEventRequest (event_id, myContext, setIsLoading, setError, navigation) {
    const url = base_url + getEvent(event_id);
    Log.info(`EventPage >> delete event >> url: ${url}`);
    const onPressYes = async () => {
      setIsLoading(true);
      await fetch(
        url,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${myContext.token}`,
          },
        },
        { timeout: 2000 }
      )
        .then(async (res) => {
          Log.info("EventPage >> delete event >> then");
          // const data = await res.json();
          createOneButtonAlert(
            "The event deleted successfully",
            "OK",
            "Delete event",
            () => {
              myContext.setRefresh(!myContext.refresh);
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
  };

export async function editEventRequest (editEvent, event_id, myContext, setIsLoading, setError, navigation) {
    const urlEditEvent = base_url + getEvent(event_id);
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
                // myContext.setRefresh(!myContext.refresh);
                const message = "event updated!";
                createOneButtonAlert(message, "OK", "", () => {
                    myContext.setRefresh(!myContext.refresh);
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
