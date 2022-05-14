import fetchTimeout from "fetch-timeout";
import { base_url, login } from "../../constants/urls";
import {
  createOneButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../constants/errorHandler";
import { TabNavigator } from "../../App";
import Log from "../../constants/logger";

export async function useLoginRequest(
  myContext,
  email,
  password,
  navigation,
  emptyLoginInputs
) {
  const { setIsLoading, setError, setToken, setId, setName } = myContext;
  setIsLoading(true);
  await fetchTimeout(
    base_url + login,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    },
    1000,
    "Timeout"
  )
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        const message = data.Error ? data.Error : "data.Error";
        createOneButtonAlert(message, "OK", "Login failed");
      } else if (STATUS_SUCCESS(res.status)) {
        setToken(data.token);
        setId(data.id);
        setName(data.name);
        createOneButtonAlert("Login succeeded", "OK", "Great!", () => {
          emptyLoginInputs();
          navigation.navigate(TabNavigator);
        });
      }
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err);
      Log.error("onPressLogin error", err);
    });
}