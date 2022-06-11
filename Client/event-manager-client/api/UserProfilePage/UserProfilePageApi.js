import {base_url, userProfile} from "../../constants/urls";
import {createOneButtonAlert, STATUS_FAILED, STATUS_SUCCESS,} from "../../constants/errorHandler";
import Log, {logApiRequest} from "../../constants/logger";
import {logAndCreateErrorMessage} from "../../validations/validations";
import {global_timeout, global_timeout_message} from "../../global/GlobalValues";

export async function fetchUserDate(myContext, setEmail, setFullName, setPhone, setCountry, setCity, setStreet, setNumber, setUser) {
    const {id, token, setIsLoading} = myContext;
    let url = base_url + userProfile(id);
    await fetch(
        url,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        },
        {timeout: global_timeout}
    )
        .then(async (res) => {
            const data = await res.json();
            setEmail(data.email);
            setFullName(data.name);
            setPhone(data.phone);
            if (data.address) {
                setCountry(data.address.country);
                setCity(data.address.city);
                setStreet(data.address.street);
                setNumber(data.address.number.toString());
            }
            setUser(data);
        })
        .catch((err) => {
            setIsLoading(false);
            Log.error("UserProfilePage >> getData >> error", err);
        });
}

export async function editUserRequest(user, navigation, myContext) {
    let functionName = "Edit User Request";
    const {id, token, setIsLoading} = myContext;
    let url = base_url + userProfile(id);
    let request = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(user),
    };
    logApiRequest(functionName, url, request);
    await fetch(url, request, {timeout: global_timeout})
        .then(async (res) => {
            const data = await res.json();
            if (STATUS_FAILED(res.status)) {
                const message = data.Error ? data.Error : "";
                createOneButtonAlert(message, "OK", "Editing user failed");
            } else if (STATUS_SUCCESS(res.status)) {
                const message = "You have successfully edited your user profile!";
                createOneButtonAlert(message, "OK", "Edit Succeeded", () =>
                    navigation.navigate("HomePage")
                );
            }
        })
        .catch((error) => {
            setIsLoading(false);
            logAndCreateErrorMessage({"Error": global_timeout_message}, functionName);
        });
}
