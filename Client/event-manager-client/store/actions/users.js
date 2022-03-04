import RegisterUser from "../../Entities/Users/RegisterUser";
import Address from "../../Entities/Users/Address";
import SignedInUser from "../../Entities/Users/SignedInUser";

export const firebase_base_url =
  "https://test-server-event-manager-default-rtdb.firebaseio.com";
export const local_base_url = "http://127.0.0.1:8000";
export const local_specific_base_url = "http://192.168.5.101:8000";
//
export const register = "/api/user.json";
export const login = "/api/login.json";
//
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";

export const registerApi = (
  nameRegister,
  emailRegister,
  passwordRegister,
  phoneRegister,
  country,
  city,
  street,
  number
) => {
  return async (dispatch) => {
    const user = new RegisterUser(
      nameRegister,
      emailRegister,
      passwordRegister,
      phoneRegister,
      new Address(country, city, street, number)
    );
    await fetch(firebase_base_url + register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    })
      .then((response) => {
        const responseData = response.json();
        //OUTPUT: nothing => need to add check OK response API_ERROR_HANDLER?
        dispatch({ type: REGISTER_USER, registerUser: user });
      })
      .catch((error) => {
        console.log("Reducer Users >> register api >> error:");
        console.log(error);
      });
  };
};

export const loginApi = (email, password) => {
  return async (dispatch) => {
    await fetch(firebase_base_url + login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        const responseData = response.json();
        //OUTPUT: token / maybe name ? to show on home page
        // const sign_in_user = new SignedInUser(email, password, "", responseData.token);
        const sign_in_user = new SignedInUser(email, password, "", "token1234");
        dispatch({ type: LOGIN_USER, sign_in_user: sign_in_user });
      })
      .catch((error) => {
        console.log("Reducer Users >> register api >> error:");
        console.log(error);
      });
  };
};
