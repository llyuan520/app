import {
    createStackNavigator,
    createBottomTabNavigator
} from "react-navigation";
import UserStack from "./UserNavigator";
import HomeStack from "./HomeNavigator";
import ProjectStack from "./ProjectNavigator";
import ContractStack from "./ContractNavigator";

const TabNavStack = createBottomTabNavigator({
    HomeStack,
    ProjectStack,
    ContractStack,
    UserStack,
}, {
    tabBarOptions: {
        activeTintColor: "#067DC6",
        inactiveTintColor: "gray"
    }
});
export default createStackNavigator({
    TabNav: TabNavStack
}, {
    headerMode: "none",
});