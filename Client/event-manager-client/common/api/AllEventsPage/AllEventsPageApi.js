import EventEntity from "../../Entities/EventEntity";
import { logApiRequest } from "../../constants/logger";
import { allEvents, base_url } from "../../constants/urls";
import { logAndCreateErrorMessage } from "../../validations/validations";
import {
  global_timeout,
  global_timeout_message,
} from "../../global/GlobalValues";
import fetchTimeout from "fetch-timeout";

export async function fetchAllEvents(myContext, setAllEventsData, navigation) {
  const { token, setIsLoading } = myContext;
  setIsLoading(true);
  let functionName = "Fetch All Events";
  let url = base_url + allEvents;
  let request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  logApiRequest(functionName, url, request, myContext);
  await fetchTimeout(url, request, global_timeout, "Timeout")
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
      logAndCreateErrorMessage({ Error: global_timeout_message }, functionName);
      navigation.navigate("HomePage");
    });
}
