import { createStackNavigator } from "react-navigation";
import UserScreen from "../screens/UserScreen";
import CompanyHomeScreen from "../screens/MyCompany/My.r";
import CreateCompany1Screen from "../screens/Company/CreateCompany1";
import TabBarIcon from "../components/TabBarIcon";
import React from "react";

const UserStack = createStackNavigator(
  {
    User: CompanyHomeScreen,
    CreateCompany1:CreateCompany1Screen
  },
  {
    headerMode: "none"
  }
);

UserStack.navigationOptions = {
  tabBarLabel: "我的",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      image={
        focused
          ? require("../statics/images/my-h.png")
          : require("../assets/images/n3.png")
      }
    />
  )
};

export default UserStack;
