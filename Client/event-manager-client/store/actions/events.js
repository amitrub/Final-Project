import { base_url, previewEvents } from "../../constants/urls";
import EventEntity from "../../Entities/EventEntity";

export const PREVIEW_EVENTS = "PREVIEW_EVENTS";
export const EVENTS = "EVENTS";

export const getPreviewEventsApi = (token) => {
  return async (dispatch) => {
    await fetch(base_url + previewEvents, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // const responseData = response.json();
        //todo: OUTPUT: list of preview events => need to add check OK response API_ERROR_HANDLER?
        let event = new EventEntity(
          "Roee and Hadas",
          "Cochav HaYam",
          "Wedding",
          "23/09/2022",
          []
        );
        const previewEventsListMock = [event, event, event];
        dispatch({
          type: PREVIEW_EVENTS,
          previewEvents: previewEventsListMock,
        });
      })
      .catch((error) => {
        console.log(
          "ERROR Reducer_Events >> getPreviewEventsApi >> error:",
          error
        );
      });
  };
};
