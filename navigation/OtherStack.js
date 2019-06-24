import { createStackNavigator, NavigationActions } from "react-navigation";
import OtherScreen from "../screens/OtherScreen";
import navigationOptions from "../options/navigation";
import {
    ProjectDetailsScreen,
    StagesScreen,
    AddItemScreen,
    AddItemStages,
    AddItemOrg,
    AddUser,
    ContractList,
    ChooseUser,
    ProjectOrgDetails,
    EditStages,
} from "../screens/Project";
import {
    CreateCompany1,
    CreateCompany2,
    CreateCompany3,
    CompanyHome,
    CompanyDetail,
    EditCompany1,
    EditCompany2,
    EditCompany3
} from "../screens/Company";
import {
    SystemMsgScreen,
    MsgHistoryScreen,
    InviteDetailScreem
} from '../screens/Home'
import {
    DepartmentDetail,
    addDepartment,
    AddDepartmentUser,
    SelDepartment,
    InvitationUser,
    CompanyOrganizationUser,
    DepartmentSettings,
    DepartmentEditUser,
    bindUserToDepartment
    } from "../screens/CompanyOrganization"
import {
    MyCompany,
    CompanyShip,
    SetSonCompany,
    AddSonCompany,
    SetCompanyAdmin,
    Setting
} from "../screens/MyCompany";

//代办
const orderOther = {
    SystemMsg: SystemMsgScreen, //系统消息
    MsgHistory: MsgHistoryScreen,//历史消息
    InviteDetail:InviteDetailScreem,//消息详情
}
//我的企业
const myCompany = {
    MyCompany: MyCompany,
    CompanyShip:CompanyShip,
    SetSonCompany:SetSonCompany,
    AddSonCompany:AddSonCompany,
    SetCompanyAdmin:SetCompanyAdmin,
    Setting:Setting,
}
//项目详情列表
const projectOther = {
    ProjectList: ProjectDetailsScreen,
    StagesList: StagesScreen,
    //添加项目三部曲
    AddItem: AddItemScreen,
    AddItemStages: AddItemStages,
    AddItemOrg: AddItemOrg,

    //添加人员两部曲
    AddUser: AddUser,
    ChooseUser: ChooseUser,

    //项目-合同详情
    ContractList: ContractList,

    //项目组织详情（从通讯录点进去）
    ProjectOrgDetails:ProjectOrgDetails,
    
    //修改项目分期
    EditStages:EditStages,
}
//企业相关
const CompanyOther = {
    CreateCompany1: CreateCompany1,
    CreateCompany2: CreateCompany2,
    CreateCompany3: CreateCompany3,
    CompanyHome:CompanyHome,
    CompanyDetail:CompanyDetail,
    EditCompany1:EditCompany1,
    EditCompany2:EditCompany2,
    EditCompany3:EditCompany3
}

//企业项目组织相关
const CompanyOrganization = {
    DepartmentDetail:DepartmentDetail,
    addDepartment:addDepartment,
    AddDepartmentUser:AddDepartmentUser,
    SelDepartment:SelDepartment,
    InvitationUser:InvitationUser,
    CompanyOrganizationUser:CompanyOrganizationUser,
    DepartmentSettings:DepartmentSettings,
    DepartmentEditUser:DepartmentEditUser,
    bindUserToDepartment:bindUserToDepartment
}

const OtherStack = createStackNavigator(
    {
        ...orderOther,
        ...projectOther,
        ...CompanyOther,
        ...CompanyOrganization,
        ...myCompany,
    }, {
        // navigationOptions
        headerMode: "none"
    }
);

// const defaultGetStateForAction = OtherStack.router.getStateForAction;

// OtherStack.router.getStateForAction = (action, state) => {
//   console.log('--------------')
//   console.log(action);
//   console.log(state);
//   if (
//     state && state!==undefined &&
//     action.type === NavigationActions.BACK &&
//     (state.index === 0 || state.index===1)
//   ) {
//     Returning null from getStateForAction means that the action
//     has been handled/blocked, but there is not a new state
//     const backAction = NavigationActions.back({key:'Main'})
//     return backAction;
//       routeName:'Main',
//       action: NavigationActions.navigate({
//         // This child action will get passed to the child router
//         // ProfileScreen.router.getStateForAction to get the child
//         // navigation state.
//         routeName: 'Home',
//       }),
//     });
//   }

//   return defaultGetStateForAction(action, state);
// };
export default OtherStack;
