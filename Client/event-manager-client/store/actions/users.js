import RegisterUser from "../../Entities/Users/RegisterUser";
import Address from "../../Entities/Users/Address";
import SignedInUser from "../../Entities/Users/SignedInUser";
import {
  api,
  base_url,
  firebaseJson,
  login,
  register,
} from "../../constants/urls";

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
    await fetch("http://10.100.102.31:8000/api/user", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
        //todo: OUTPUT: nothing => need to add check OK response API_ERROR_HANDLER?
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
    console.log("loginApi >> before fetch");
    console.log("email: " + email + ", password: " + password);
    await fetch(base_url + login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("loginApi >> then");
        console.log("response", response);
        //todo: OUTPUT: token / maybe name ? to show on home page
        //      const sign_in_user = new SignedInUser(email, password, "", responseData.token);
        const sign_in_user = new SignedInUser(email, password, "", "token1234");
        dispatch({ type: LOGIN_USER, sign_in_user: sign_in_user });
      })
      .catch((error) => {
        console.log("Reducer Users >> register api >> error:");
        console.log(error);
      });
  };
};
