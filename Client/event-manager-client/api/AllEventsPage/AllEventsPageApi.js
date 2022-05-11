import EventEntity from "../../Entities/EventEntity";
import Log, {logApiRequest} from "../../constants/logger";
import {allEvents, base_url, getEvent} from "../../constants/urls";

export async function fetchAllEvents (myContext, setAllEventsData, setIsLoading, setError) {
    let functionName = "fetchAllEvents";
    let url = base_url + allEvents;
    let request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${myContext.token}`,
        },
    }
    logApiRequest(functionName, url, request);
    await fetch(
      url,
      request,
      { timeout: 2000 }
    )
      .then(async (res) => {
        const data = await res.json();
        const loadedEvents = [];
        for (const key in data) {
          loadedEvents.push(
            new EventEntity(
              data[key].id,
              data[key].event_manager,
              data[key].type,
              data[key].event_owners,
              data[key].event_name,
              data[key].date,
              data[key].budget,
              data[key].location,
              data[key].event_schedules,
              data[key].suppliers
            )
          );
        }

        setAllEventsData(loadedEvents);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        Log.error("AllEventsPage >> getData >> error", err);
      });
  };