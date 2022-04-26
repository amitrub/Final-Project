import {base_url, eventManager, homePage} from "../../constants/urls";
import {STATUS_FAILED, STATUS_SUCCESS} from "../../constants/errorHandler";
import Log from "../../constants/logger";

export async function postEventManager() {
    await fetch(
      base_url + eventManager(myContext.id),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${myContext.token}`,
        },
      },
      { timeout: 2000 }
    )
      .then(async (res) => {
        const data = await res.json();
        const message = data.Error ? data.Error : "";
        if (STATUS_FAILED(res.status)) {
          console.log("POST is-event-manager FAILED >> Error: ", message);
        } else if (STATUS_SUCCESS(res.status)) {
          console.log("POST is-event-manager SUCCESS");
        }
      })
      .catch((error) => console.log("postEventManager catch error", error));
  }

  export async function getIsEventManager(myContext) {
    await fetch(
      base_url + eventManager(myContext.id),
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
        if (STATUS_FAILED(res.status)) {
          const message = data.Error ? data.Error : "";
          console.log("GET is-event-manager FAILED >> Error: ", message);
        } else if (STATUS_SUCCESS(res.status)) {
          if (!data.is_event_manager) {
            await postEventManager();
          } else {
            console.log(
              "GET is-event-manager SUCCESS >> already event-manager"
            );
          }
        }
      })
      .catch((error) => console.log("onPressRegister error", error));
  }

  export async function getHomePageData(myContext, setEventsPreview, setIsLoading) {
    await fetch(
      base_url + homePage(myContext.id),
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
        // console.log(data);
        if (STATUS_FAILED(res.status)) {
          const message = data.Error ? data.Error : "";
          Log.error("GET home page FAILED >> Error: ", message);
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
      .catch((error) => console.log("onPressRegister error", error));
  }