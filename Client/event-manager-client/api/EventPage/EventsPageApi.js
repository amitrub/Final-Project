import Log, {logApiRequest} from "../../constants/logger";
import {addEventOwner, allEvents, base_url, getEvent,} from "../../constants/urls";
import {createOneButtonAlert, createTwoButtonAlert, STATUS_FAILED, STATUS_SUCCESS} from "../../constants/errorHandler";
import fetchTimeout from "fetch-timeout";

export async function fetchEvent(myContext, setEvent, setIsLoading, setError) {
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

export async function deleteEventRequest(myContext, event_id, navigation) {
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
      myContext.setIsLoading(true);
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
              myContext.setIsLoading(false);
            }
          );
        })
        .catch((err) => {
          myContext.setIsLoading(false);
          myContext.setError(err);
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

export async function editEventRequest(myContext, editEvent, event_id, navigation) {

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
    myContext.setIsLoading(true);
    logApiRequest(functionName, url, request);
    await fetchTimeout(
        url,
        request,
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
            myContext.setIsLoading(false);
            myContext.setError(err);
            Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
        });
}

export async function addEventOwnerRequest(myContext, event, navigation) {
    const url = base_url + allEvents;

    await fetchTimeout(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${myContext.token}`,
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
          myContext.setRefresh(!myContext.refresh);
          const message =
            "The event was added successfully! \nGo watch your events";
          createOneButtonAlert(message, "OK", "ADD NEW EVENT", () =>
            navigation.navigate("AllEvents")
          );
        }
      })
      .catch((err) => {
        myContext.setIsLoading(false);
        myContext.setError(err);
        Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
      });
}

export async function editEventOwnersRequest(myContext, editEvent, newOwners, navigation) {

    const urlEditEvent = base_url + getEvent(editEvent.id);
    const urlEditOwnerEvent = base_url + addEventOwner(editEvent.id);
    async function addNewOwnerRequest(owner) {
      await fetchTimeout(
        urlEditOwnerEvent,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${myContext.token}`,
          },
          body: JSON.stringify({
            name: owner.name,
            phone: owner.phone,
          }),
        },
        5000,
        "Timeout"
      )
        .then(async (res) => {
          const data = await res.json();
          if (STATUS_FAILED(res.status)) {
            const message = data.toString();
            createOneButtonAlert(message, "OK", "add New Owner Request failed");
            return false;
          } else if (STATUS_SUCCESS(res.status)) {
            return true;
          }
        })
        .catch((err) => {
          myContext.setIsLoading(false);
          myContext.setError(err);
          Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
          return false;
        });
    }

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
          let ownersSucceeded = true;
          for (const owner of newOwners) {
            if (!ownersSucceeded) break;
            addNewOwnerRequest(owner).then((res) => {
              ownersSucceeded = ownersSucceeded && !!res;
            });
          }

          //----------------------------------------------------------
          if (ownersSucceeded) {
            myContext.setRefresh(!myContext.refresh);
            const message = "Owners updated!";
            createOneButtonAlert(message, "OK", "", () => navigation.pop());
          } else {
            createOneButtonAlert(
              "Owners didn't updated successfully!",
              "OK",
              "Edit owners error!",
              () => navigation.pop()
            );
          }
        }
      })
      .catch((err) => {
        myContext.setIsLoading(false);
        myContext.setError(err);
        Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
      });
}