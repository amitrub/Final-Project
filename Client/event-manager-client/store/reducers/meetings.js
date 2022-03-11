import { PREVIEW_MEETINGS, MEETINGS } from "../actions/meetings";

const initialState = {
  previewMeetings: [],
  allMeetings: [],
};

const meetingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PREVIEW_MEETINGS:
      return {
        ...state,
        previewMeetings: action.previewMeetings,
      };
    case MEETINGS:
      return {
        ...state,
        allMeetings: action.allMeetings,
      };
    default:
      return state;
  }
};

export default meetingsReducer;
