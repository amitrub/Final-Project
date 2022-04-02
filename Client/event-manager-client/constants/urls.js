//urls
export const remote_base_url =
  "http://ec2-54-236-196-72.compute-1.amazonaws.com";
export const local_base_url = "http://10.100.102.31:8000";
export const base_url = remote_base_url;

//general
export const api = "/api";
export const firebaseJson = ".json";

//users
export const register = "/api/user/";
export const login = "/api/login/";
export const eventManager = (user_id) => `/api/user/${user_id}/event_manager/`;

//meetings
export const previewMeetingsCapitlP = "/api/PreviewMeetings/";
export const previewMeetings = "/api/previewMeetings/";
export const allMeetings = "/api/allMeetings/";

//events
export const previewEvents = "/api/previewEvents/";
export const allEvents = "/api/events/";
