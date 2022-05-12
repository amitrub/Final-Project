import {base_url, register} from "../../constants/urls";
import {createOneButtonAlert, STATUS_FAILED, STATUS_SUCCESS} from "../../constants/errorHandler";
import Log, {logApiRequest} from "../../constants/logger";


export async function registerUserRequest (user, emptyRegisterInputs) {
    let functionName = "registerUserRequest";
    let url = base_url + register;
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }
    logApiRequest(functionName, url, request)
    await fetch(
      url,
      request,
      { timeout: 2000 }
    )
      .then(async (res) => {
        const data = await res.json();
        if (STATUS_FAILED(res.status)) {
          const message = data.Error ? data.Error : "";
          createOneButtonAlert(message, "OK", "Registration Failed");
        } else if (STATUS_SUCCESS(res.status)) {
          const message = "You have successfully registered!\nplease LOGIN";
          createOneButtonAlert(message, "OK", "Registration Succeeded", () =>
            props.navigation.navigate("Welcome")
          );
          emptyRegisterInputs();
        }
      })
      .catch((error) => {
        createOneButtonAlert("Server is soooo slow, you should check it...");
        Log.error("onPressRegister error", error);
      });
}