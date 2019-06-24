import { createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/Home/HomeScreen";
import TabBarIcon from "../components/TabBarIcon";
import navigationOptions from "../options/navigation";
import React from "react";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    navigationOptions,
    headerMode: "none",
  }
);

HomeStack.navigationOptions = () => ({
  tabBarLabel: "代办",
  //tabBarVisible,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      image={
        focused
          ? require("../statics/images/orderOn.png")
          : require("../statics/images/order.png")
      }
    />
  )
});

export default HomeStack;
