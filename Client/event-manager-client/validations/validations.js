import Loader from "../components/basicComponents/others/Loader";
import React, {useContext} from "react";
import ErrorScreen, {ErrorMessages,} from "../components/basicComponents/others/ErrorScreen";
import UserAuthentication from "../global/UserAuthentication";
import Log from "../constants/logger";
import {createOneButtonAlert} from "../constants/errorHandler";

export const handleLoading = () => {
    const myContext = useContext(UserAuthentication);
    if (myContext.isLoading) return <Loader/>;
};

export const handleError = () => {
    const myContext = useContext(UserAuthentication);
    if (myContext.error)
        return <ErrorScreen errorMessage={ErrorMessages.Fetching}/>;
};

export const logAndCreateErrorMessage = (data, functionName) => {
    const errorMessage = data.Error ? data.Error : "data.Error";
    Log.error(`${functionName} >> failed with error: ${errorMessage}`);
    createOneButtonAlert(
        errorMessage,
        "OK",
        `${functionName} failed`
    );
}

export function isNotValidAddEventInput(event) {
    return (
        event.type === "" ||
        event.eventName === "" ||
        event.date === "" ||
        event.budget === "" ||
        event.location === ""
    );
}
