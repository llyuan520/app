import { bindActionCreators } from "redux";

const initialState = {};

const NAME_SPACE = "USER";

const createActionTypeByNameSpace = name => type => `${name}/${type}`;

const actionByType = createActionTypeByNameSpace(NAME_SPACE);

const LOGIN = actionByType("LOGIN");

const LOGOUT = actionByType("LOGOUT");

const UserActionCreators = {
  login(userInfo) {
    return {
      type: LOGIN,
      payload: userInfo
    };
  },


  logout() {
    return {
      type: LOGOUT
    };
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const bindActions = dispatch =>
  bindActionCreators(UserActionCreators, dispatch);
