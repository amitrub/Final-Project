import { base_url, eventManager, homePage } from "../../constants/urls";
import { STATUS_FAILED, STATUS_SUCCESS } from "../../constants/errorHandler";
import Log, { logApiRequest } from "../../constants/logger";
import { logAndCreateErrorMessage } from "../../validations/validations";
import {
  global_timeout,
  global_timeout_message,
} from "../../global/GlobalValues";
import fetchTimeout from "fetch-timeout";

export async function postEventManager(myContext, navigation) {
  const { id, token, setIsLoading } = myContext;
  let functionName = "Post Event Manager";
  let url = base_url + eventManager(id);
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  logApiRequest(functionName, url, request, myContext);
  await fetchTimeout(url, request, global_timeout, "Timeout")
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        logAndCreateErrorMessage(data, functionName);
      } else if (STATUS_SUCCESS(res.status)) {
        console.log("POST is-event-manager SUCCESS");
      }
    })
    .catch((error) => {
      setIsLoading(false);
      logAndCreateErrorMessage({ Error: global_timeout_message }, functionName);
      navigation.pop();
    });
}

export async function getIsEventManager(myContext, navigation) {
  const { id, token, setIsLoading } = myContext;
  let functionName = "Get Is Event Manager";
  let url = base_url + eventManager(id);
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
      if (STATUS_FAILED(res.status)) {
        logAndCreateErrorMessage(data, functionName);
      } else if (STATUS_SUCCESS(res.status)) {
        if (!data.is_event_manager) {
          await postEventManager(myContext, navigation);
        } else {
          //console.log("GET is-event-manager SUCCESS >> already event-manager");
        }
      }
    })
    .catch((error) => {
      setIsLoading(false);
      logAndCreateErrorMessage({ Error: global_timeout_message }, functionName);
      navigation.pop();
    });
}

export async function getHomePageData(myContext, setEventsPreview, navigation) {
  const { id, token, setIsLoading } = myContext;
  let functionName = "getHomePageData";
  let url = base_url + homePage(id);
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
      if (STATUS_FAILED(res.status)) {
        logAndCreateErrorMessage(data, functionName);
      } else if (STATUS_SUCCESS(res.status)) {
        if (!data.events) {
          Log.error("getHomePageData error", error);
        } else {
          Log.info("GET home page SUCCESS >> already event-manager");
          setEventsPreview(data.events);
        }
        setIsLoading(false);
      }
    })
    .catch((error) => {
      setIsLoading(false);
      logAndCreateErrorMessage({ Error: global_timeout_message }, functionName);
      navigation.pop();
    });
}
