import { createStackNavigator } from "react-navigation";
import OrganizationScreen from "../screens/CompanyOrganization"
import TabBarIcon from "../components/TabBarIcon";
import navigationOptions from "../options/navigation";
import React from "react";

const ContractStack = createStackNavigator(
  {
    Home: OrganizationScreen
  },
  {
    headerMode: "none"
  }
);

ContractStack.navigationOptions = () => ({
  tabBarLabel: "通讯录",
  //tabBarVisible,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      image={
        focused
          ? require("../statics/images/contact-h.png")
          : require("../statics/images/contact.png")
      }
    />
  )
});

export default ContractStack;
