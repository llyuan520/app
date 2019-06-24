import { createStackNavigator } from "react-navigation";
import ProjectScreen from "../screens/Project";
import TabBarIcon from "../components/TabBarIcon";
import React from "react";

const ProjectStack = createStackNavigator(
  {
    Home: ProjectScreen
  },
  {
    headerMode: "none",
  }
);

ProjectStack.navigationOptions = () => ({
  tabBarLabel: "项目",
  //tabBarVisible,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      image={
        focused
          ? require("../statics/images/project-h.png")
          : require("../statics/images/project2.png")
      }
    />
  )
});

export default ProjectStack;
