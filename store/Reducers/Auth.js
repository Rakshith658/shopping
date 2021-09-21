import { AUTH, LOGOUT } from "../action/Auth";

const initialState = {
  token: null,
  userId: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return {
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};
