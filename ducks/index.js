import { combineReducers } from "redux";
import { createNavigationReducer } from "react-navigation-redux-helpers";
import AppNavigator from "../navigation/AppNavigator";
import user from "./user";
import token from "./token";
const navReducer = createNavigationReducer(AppNavigator);

export default combineReducers({
  nav: navReducer,
  user,
  token
});
