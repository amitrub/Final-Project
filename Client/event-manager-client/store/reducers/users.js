import { REGISTER_USER } from "../actions/users";

const initialState = {
  registered: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      debugger;
      return {
        ...state,
        registered: state.registered.concat(action.registerUser),
      };
    default:
      return state;
  }
};

export default usersReducer;
