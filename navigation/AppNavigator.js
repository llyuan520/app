import MainTabNavigator from "./MainTabNavigator";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
// import LoginScreen from "../screens/LoginScreen";
import LoginScreen from "../screens/Login";
import ForgetPassWordScreen from "../screens/ForgetPassword";
import RegisterScreen from "../screens/Register"
import PerfecteTheInfoScreen from "../screens/PerfecteTheInfo"
import JoinCompanyScreen from "../screens/JoinCompany"
import ListSearchScreen from "../screens/ListSearch"
import OtherStack from "./OtherStack";
import AuthLoadingScreen from "../screens/AuthLoading";
import CameraExample from "../screens/Login/Camera.r"
// import RegisterScreen from "../screens/RegisterScreen";

const AppStack = createStackNavigator(
  {
    Main: MainTabNavigator,
    Other: OtherStack
  },
  {
    initialRouteName: "Main",
    headerMode: "none"
  }
);
const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    CameraExample:CameraExample,
    ForgetPassword: ForgetPassWordScreen,
    PerfecteTheInfo :PerfecteTheInfoScreen,
    JoinCompany: JoinCompanyScreen,
    Register: RegisterScreen,
    ListSearch: ListSearchScreen
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);
export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading",
    headerMode: "none"
  }
);
