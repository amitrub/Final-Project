import fetchTimeout from "fetch-timeout";
import {base_url, login, loginWithGoogle, register} from "../../constants/urls";
import {
  createOneButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../constants/errorHandler";
import { TabNavigator } from "../../navigation/tabNavigator";
import Log, {logApiRequest} from "../../constants/logger";

export async function useLoginRequest(
  myContext,
  email,
  password,
  navigation,
  emptyLoginInputs,
  setShowLoginError
) {
  const { setIsLoading, setError, setToken, setId, setName } = myContext;
  setIsLoading(true);
    let functionName = "loginUserRequest";
    let url = base_url + login;
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    }
    logApiRequest(functionName, url, request)
    await fetchTimeout(
    url,
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
    2000,
    "Timeout"
  )
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        const message = data.Error ? data.Error : "data.Error";
        setShowLoginError(true);
        createOneButtonAlert(message, "OK", "Login failed");
      } else if (STATUS_SUCCESS(res.status)) {
        setToken(data.token);
        setId(data.id);
        setName(data.name);
        createOneButtonAlert("Login succeeded", "OK", "Great!", () => {
          emptyLoginInputs();
        });
        navigation.navigate("TabNavigator");
      }
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      //setError(err);
      setShowLoginError(true);
      Log.error("onPressLogin error", err);
    });
}

export async function useLoginWithGoogleRequest(
    myContext,
    email,
    accessToken,
    navigation,
    emptyLoginInputs,
    setShowLoginError
) {
    const { setIsLoading, setError, setToken, setId, setName } = myContext;
    setIsLoading(true);
    console.log(base_url + loginWithGoogle)
    console.log(email)
    console.log(accessToken)
    let functionName = "loginUserRequest";
    let url = base_url + loginWithGoogle;
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            access_token: accessToken,
        }),
    }
    logApiRequest(functionName, url, request)
    await fetchTimeout(
        url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                access_token: accessToken,
            }),
        },
        2000,
        "Timeout"
    )
        .then(async (res) => {
            const data = await res.json();
            if (STATUS_FAILED(res.status)) {
                const message = data.Error ? data.Error : "data.Error";
                setShowLoginError(true);
                createOneButtonAlert(message, "OK", "Login failed");
            } else if (STATUS_SUCCESS(res.status)) {
                setToken(data.token);
                setId(data.id);
                setName(data.name);
                createOneButtonAlert("Login succeeded", "OK", "Great!", () => {
                    emptyLoginInputs();
                });
                navigation.navigate("TabNavigator");
            }
            setIsLoading(false);
        })
        .catch((err) => {
            setIsLoading(false);
            //setError(err);
            setShowLoginError(true);
            Log.error("onPressSignInGoogle error", err);
        });
}
