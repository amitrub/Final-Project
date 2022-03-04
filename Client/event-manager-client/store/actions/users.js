import RegisterUser from "../../Entities/Users/RegisterUser";
import Address from "../../Entities/Users/Address";

export const firebase_url =
  "https://test-server-event-manager-default-rtdb.firebaseio.com/tests.json";
export const local_url = "http://127.0.0.1:8000/api/user/";
export const local_specific_url = "http://192.168.5.101:8000/api/user/";

export const REGISTER_USER = "REGISTER_USER";

export const registerApi = (
  nameRegister,
  emailRegister,
  passwordRegister,
  phoneRegister
) => {
  return async (dispatch) => {
    const user = new RegisterUser(
      nameRegister,
      emailRegister,
      passwordRegister,
      phoneRegister,
      new Address("country", "city", "street", "number")
    );
    await fetch(firebase_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    })
      .then((response) => {
        console.log("ActionUsers >> registerApi >> after post request");
        const responseData = response.json();
        console.log("ActionUsers >> registerApi >> responseData:");
        console.log(responseData);
        dispatch({ type: REGISTER_USER, registerUser: user });
      })
      .catch((error) => {
        console.log("Reducer Users >> register api >> error:");
        console.log(error);
      });
  };
};
