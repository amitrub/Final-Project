import { base_url, previewMeetings } from "../../constants/urls";
import MeetingEntity from "../../Entities/MeetingEntity";

export const PREVIEW = "PREVIEW";
export const MEETINGS = "MEETINGS";

export const getPreviewMeetingsApi = (token) => {
  return async (dispatch) => {
    await fetch(base_url + previewMeetings, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // const responseData = response.json();
        //todo: OUTPUT: list of preview meetings => need to add check OK response API_ERROR_HANDLER?
        let meeting = new MeetingEntity(
          "Destino",
          "10:00",
          "Eat as much as you can!"
        );
        const previewMeetingsListMock = [meeting, meeting, meeting];
        dispatch({ type: PREVIEW, previewMeetings: previewMeetingsListMock });
      })
      .catch((error) => {
        console.log(
          "ERROR Reducer_Meetings >> getPreviewMeetingsApi >> error:"
        );
        console.log(error);
      });
  };
};
