import { PREVIEW_EVENTS, EVENTS } from "../actions/events";

const initialState = {
  previewMeetings: [],
  previewEvents: [],
  allEvents: [],
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PREVIEW_EVENTS:
      return {
        ...state,
        previewEvents: action.previewEvents,
        previewMeetings: action.previewMeetings,
      };
    case EVENTS:
      return {
        ...state,
        allEvents: action.allEvents,
      };
    default:
      return state;
  }
};

export default eventsReducer;
