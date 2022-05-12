import { base_url, register } from "../../constants/urls";
import {
  createOneButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../constants/errorHandler";
import Log from "../../constants/logger";

export async function registerUserRequest(user, emptyRegisterInputs) {
  await fetch(
    base_url + register,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
    { timeout: 2000 }
  )
    .then(async (res) => {
      try {
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
      } catch (e) {
        console.log(e);
      }
    })
    .catch((error) => {
      createOneButtonAlert("Server is soooo slow, you should check it...");
      Log.error("onPressRegister error", error);
    });
}
