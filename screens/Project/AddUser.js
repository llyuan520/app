//添加成员
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BackHeader, Icon, Toast } from '../../components';
import { List, WingBlank } from 'antd-mobile-rn';
import { request, cleanParams } from '../../utils'
import { connect } from "react-redux";

const Item = List.Item;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    body: {
        paddingLeft: 20,
        borderTopWidth: 1,
        borderColor: "#eee"
    },
    addBox: {
    },
    addUser: {
        fontSize: 16,
        color: "#067DC6",
        lineHeight: 45,
        marginTop: 10
    },
    addUserInList: {
        fontSize: 16,
        color: "#067DC6",
        lineHeight: 45,
        marginLeft: 30
    },
    listItem: {
        lineHeight: 80,
        height: 80
    },
    userItem: {
        marginLeft: 40
    },
    img: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginRight: 10
    },
    userSign: {
        color: "#067DC6",
        fontFamily: "PingFangSC-Regular",
        fontSize: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#067DC6",
        width: 32,
        left: 70,
        position: "absolute",
    }
});


class AddUser extends React.Component {

    state = {
        userData: [],
        userList: [],
        companyData: [],
        companyList: []
    }

    addUser = (userData = [], companyId) => {
        const { stageId, roleId } = this.props.navigation.state.params;
        this.setState({ userData });
        const body = cleanParams({
            ordinaryList: userData,
            itemRoleId: roleId, itemStageId: stageId, companyId
        })
        request("/item-org/appSaveOrgPerson", {
            body,
            method: "POST"
        }).then(res => {
            if (res) {
                Toast.success(res.msg)
            }
        })
    }

    addCompany = (arr = []) => {
        const { stageId, roleId } = this.props.navigation.state.params;
        console.log(arr)
        request("/item-org/appSaveOrgCompany", {
            body: {
                companyReqList: arr,
                itemRoleId: roleId, itemStageId: stageId
            },
            method: "POST"
        }).then(res => {
            if (res) {
                Toast.success(res.msg)
            }
        })
    }

    //初始化进入界面获取已经选择的人员和公司
    getList() {
        const { stageId, roleId } = this.props.navigation.state.params;
        return request("/item-org/appFindOrgCompOrPerson", {
            params: {
                roleId, stageId
            }
        })
            .then(res => {
                this.setState({
                    userData: res.data.orgPersonResultList || [],
                    companyData: res.data.orgCompanyResultList || []
                })
            })
    }


    componentWillReceiveProps() {
        this.getList();
    }

    componentDidMount() {
        this.getList();
    }


    render() {
        /**
         * @param userType 判断是甲方添加还是乙方添加，1表示甲方，0表示乙方
         * @param roleName 页面的title
         * @param roleType 判断甲方添加的是本公司的还是合作方公司的，1的时候是甲方人员
         */
        const { navigation } = this.props;
        const { roleName, roleType, stageId, roleId, userType = 1 } = this.props.navigation.state.params;
        const { userData, companyData } = this.state;
        const _addUser = {
            title: roleType === "3" ? "设置负责人" : "添加成员",
            confirmFun: this.addUser,
            chooseList: userData,
            params: {
                stageId,
                roleId,
            },
            url: "/item-org/getRoleUsers",
        }
        const _addCompany = {
            title: "添加公司",
            confirmFun: this.addCompany,
            chooseList: companyData,
            itemTitle: "companyName",
            itemImg: "companyLogo",
            itemId: "companyId",
            params: {
                stageId,
                roleId
            },
            url: "/item-org/getRoleCompany",
        }

        const addIcon = (props, status, companyId) => <View style={styles.addBox}>
            <Text style={status ? styles.addUserInList : styles.addUser} onPress={() => navigation.navigate("ChooseUser", { ...props, companyId })}><Icon name="md-add-circle" blue size={50} />
                &nbsp;&nbsp;{props.title}</Text>
        </View>
        /**
        * 
        * @param {number} userType 人员类型，1表示甲方人员，0表示乙方人员。
        * @param {string} roleType 角色类型，“3”表示甲方人员
         */
        const init = (userType, roleType) => {
            if (userType === 1 && roleType === "3") {
                //甲方添加公司和负责人
                return <View style={styles.body}>
                    {
                        addIcon(_addCompany)
                    }
                    <List>
                        {
                            companyData && companyData.map((item, index) =>
                                <View key={index}>
                                    <Item
                                        activeStyle={false}
                                        style={styles.listItem}
                                        thumb={<Image style={styles.img}
                                            source={{ uri: item.companyLogo || "" }} />}
                                        extra={item.phone}>{item.companyName}
                                    </Item>
                                    <Item activeStyle={false}>
                                        {addIcon(_addUser, true, item.companyId)}
                                    </Item>
                                    {
                                        item.personList && item.personList.map((x, index) => <Item key={index}
                                            activeStyle={false}
                                            style={styles.userItem}
                                            thumb={<Image style={styles.img}
                                                source={{ uri: x.avatar }} />}
                                            extra={x.phone}>{x.userName}
                                        </Item>)
                                    }
                                </View>)
                        }
                    </List>
                </View>
            } else if (userType === 1 && roleType !== "3") {
                //甲方添加本公司人员
                return <View style={styles.body}>
                    {
                        addIcon(_addUser)
                    }
                    <List>
                        {
                            userData && userData.map((item, index) =>
                                <Item key={index}
                                    activeStyle={false}
                                    style={styles.listItem}
                                    thumb={<Image style={styles.img}
                                        source={{ uri: item.avatar }} />}
                                    extra={item.phone}>{item.userName}
                                </Item>)
                        }
                    </List>
                </View>
            } else if (userType === 0 && roleType === "3") {
                //乙方负责人添加人员
                //userSign 1是负责人0不是
                //TODO 判断当前操作人ID和负责人ID相同才可以
                return <List>
                    {
                        companyData && companyData.map((item, index) =>
                            <View key={index}>
                                <Item
                                    activeStyle={false}
                                    style={styles.listItem}
                                    thumb={<Image style={styles.img}
                                        source={{ uri: item.companyLogo || "" }} />}
                                    extra={item.phone}>{item.companyName}
                                </Item>
                                {
                                    item.personList && item.personList.map((x, index) => {
                                        return (
                                            <Item key={index}
                                                activeStyle={false}
                                                style={styles.userItem}
                                                thumb={<Image style={styles.img}
                                                    source={{ uri: x.avatar }} />}
                                                extra={x.phone}>
                                                {x.userName}
                                                <Text style={styles.userSign}>{x.userSign === "1" && "负责人"}</Text>
                                            </Item>
                                        )
                                    })
                                }
                                {
                                    item.personList && item.personList.map((x, index) => {
                                        if (x.userId === this.props.user.userId) {
                                            return <Item activeStyle={false}>
                                                {addIcon({ ..._addUser, title: "添加成员" }, true, item.companyId)}
                                            </Item>
                                        }
                                    })
                                }
                            </View>)
                    }
                </List>
            } else {
                //查看组织人员
                return <List>
                    {
                        userData && userData.map((item, index) =>
                            <Item key={index}
                                activeStyle={false}
                                style={styles.listItem}
                                thumb={<Image style={styles.img}
                                    source={{ uri: item.avatar }} />}
                                extra={item.phone}>{item.userName}
                            </Item>)
                    }
                </List>
            }
        }
        return (
            <View style={styles.container}>
                <WingBlank><BackHeader title={roleName} border /></WingBlank>
                {
                    init(userType, roleType)
                }
            </View>
        )
    }
}

export default connect(
    ({ user }) => ({
        user,
    }),
)(AddUser)