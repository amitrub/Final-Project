import Log, {logApiRequest} from "../../constants/logger";
import {base_url, getEvent, register} from "../../constants/urls";
import {createOneButtonAlert, createTwoButtonAlert, STATUS_FAILED, STATUS_SUCCESS} from "../../constants/errorHandler";

export async function fetchEvent (myContext, setEvent, setIsLoading, setError) {
    let functionName = "fetchEvent";
    let url = base_url + getEvent(event_id);
    let request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${myContext.token}`,
        },
    }
    logApiRequest(functionName, url, request)
    await fetch(
            url,
            request,
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
    let functionName = "deleteEventRequest";
    let url = base_url + getEvent(event_id);
    let request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${myContext.token}`,
        },
    }
    logApiRequest(functionName, url, request)
    const onPressYes = async () => {
      setIsLoading(true);
      await fetch(
        url,
        request,
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
    let functionName = "editEventRequest";
    let url = base_url + getEvent(event_id);
    let request = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${myContext.token}`,
        },
        body: JSON.stringify(editEvent),
    }
    logApiRequest(functionName, url, request);
    await fetch(
        url,
        request,
        { timeout: 5000 }
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
