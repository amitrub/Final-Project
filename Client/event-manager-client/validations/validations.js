import Loader from "../components/basicComponents/others/Loader";
import React, { useContext } from "react";
import ErrorScreen, {
  ErrorMessages,
} from "../components/basicComponents/others/ErrorScreen";
import UserAuthentication from "../global/UserAuthentication";

export const handleLoading = () => {
  const myContext = useContext(UserAuthentication);
  if (myContext.isLoading) return <Loader />;
};

export const handleError = () => {
  const myContext = useContext(UserAuthentication);
  if (myContext.error)
    return <ErrorScreen errorMessage={ErrorMessages.Fetching} />;
};

export function isNotValidAddEventInput(event) {
  return (
    event.type === "" ||
    event.eventName === "" ||
    event.date === "" ||
    event.budget === "" ||
    event.location === ""
  );
}
