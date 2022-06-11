import {base_url, register} from "../../constants/urls";
import {createOneButtonAlert, STATUS_FAILED, STATUS_SUCCESS,} from "../../constants/errorHandler";
import {logApiRequest} from "../../constants/logger";
import {logAndCreateErrorMessage} from "../../validations/validations";
import {global_timeout, global_timeout_message} from "../../global/GlobalValues";
import fetchTimeout from "fetch-timeout";

export async function registerUserRequest(
    user,
    emptyRegisterInputs,
    navigation,
    myContext,
) {
    const {setIsLoading} = myContext;
    setIsLoading(true);
    let functionName = "Register User Request";
    let url = base_url + register;
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };
    logApiRequest(functionName, url, request);
    await fetchTimeout(url, request, global_timeout, "Timeout")
        .then(async (res) => {
            const data = await res.json();
            if (STATUS_FAILED(res.status)) {
                logAndCreateErrorMessage(data, functionName);
            } else if (STATUS_SUCCESS(res.status)) {
                const message = "You have successfully registered!\nplease LOGIN";
                createOneButtonAlert(message, "OK", "Registration Succeeded", () =>
                    navigation.navigate("Welcome")
                );
                emptyRegisterInputs();
                setIsLoading(false);
            }
        })
        .catch((error) => {
            setIsLoading(false);
            logAndCreateErrorMessage({"Error": global_timeout_message}, functionName);
        });
}
