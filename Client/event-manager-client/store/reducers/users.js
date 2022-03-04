import { LOGIN_USER, REGISTER_USER } from "../actions/users";

const initialState = {
  registered: [],
  signed_in_user: {},
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        registered: state.registered.concat(action.registerUser),
      };
    case LOGIN_USER:
      return {
        ...state,
        signed_in_user: state.registered.concat(action.registerUser),
      };
    default:
      return state;
  }
};

export default usersReducer;
