//urls
export const remote_base_url =
  "http://ec2-18-215-93-123.compute-1.amazonaws.com";
export const remote_base_url_https = "https://eventit.lol";
export const local_base_url = "http://10.100.102.31:8000";
export const base_url = remote_base_url_https;

//general
export const api = "/api";
export const firebaseJson = ".json";
export const homePage = (user_id) => `/api/user/${user_id}/homepage/`;

//users
export const register = "/api/user/";
export const login = "/api/login/";
export const eventManager = (user_id) => `/api/user/${user_id}/event_manager/`;
export const eventSchedulesById = (user_id) =>
  `/api/user/${user_id}/event_schedules/`;

//meetings
export const previewMeetingsCapitlP = "/api/PreviewMeetings/";
export const previewMeetings = "/api/previewMeetings/";
export const allMeetings = "/api/allMeetings/";

//events
export const previewEvents = "/api/previewEvents/";
export const allEvents = "/api/events/";
export const getEvent = (eventId) => `/api/events/${eventId}/`;
export const postEventSchedule = (eventId) =>
  `/api/events/${eventId}/event_schedule/`;

//events_owners
export const addEventOwner = (eventId) => `/api/events/${eventId}/event_owner/`;

//events_suppliers
export const getOrPostEventSuppliers = (eventId) =>
  `/api/events/${eventId}/supplier/`; //GET + POST
export const getOrPutSupplier = (eventId, supplierId) =>
  `/api/events/${eventId}/supplier/${supplierId}/`; //GET + PUT
