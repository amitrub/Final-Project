import React from "react";
import Log from "../constants/logger";
import {createOneButtonAlert} from "../constants/errorHandler";


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
