import { bindActionCreators } from "redux";

const initialState = {};

const NAME_SPACE = "TOKEN";

const createActionTypeByNameSpace = name => type => `${name}/${type}`;

const actionByType = createActionTypeByNameSpace(NAME_SPACE);

const TOKEN = actionByType("TOKEN");

const TokenActionCreators = {
  saveToken(token) {
    return {
      type: TOKEN,
      payload: token
    };
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOKEN:
      return {
          ...state,
          ...action.payload
      }
    default:
      return state;
  }
};

export const bindTokenActions = dispatch =>
  bindActionCreators(TokenActionCreators, dispatch);
