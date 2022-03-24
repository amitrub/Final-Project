//urls
export const firebase_base_url =
  "https://test-server-event-manager-default-rtdb.firebaseio.com";
export const local_base_url = "http://127.0.0.1:8000";
export const local_specific_base_url = "http://10.100.102.31:8000";
export const ngrok_specific_base_url = "https://0e31-89-139-77-66.ngrok.io";
export const base_url = local_specific_base_url;

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
