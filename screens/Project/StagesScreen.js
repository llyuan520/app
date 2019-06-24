import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableHighlight } from "react-native";
import {
    List, Toast
} from "antd-mobile-rn";
import { BackWithTabs, EditList } from '../../components';
import { get } from 'lodash'
import { request, requestEnum } from '../../utils';
const Item = List.Item;
const Brief = Item.Brief;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    tabs: {
        height: 28,
        width: 180,
        borderRadius: 8,
    },
    body: {
        backgroundColor: '#fff',
    },
    list: {
        height: 116,
    },
    listItem: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        backgroundColor: '#fff',
    },
    itemTitle: {
        fontSize: 16,
        fontFamily: "PingFangSC-Medium",
        color: "#2B2B2B",
        lineHeight: 30,
        height: 30
    },
    itemSum: {
        fontSize: 10,
        color: "#067DC6",
        fontFamily: "PingFangSC-Regular",
        lineHeight: 30,
        height: 30
    },
    conNum: {
        color: "#666",
        fontSize: 12,
        height: 30,
        lineHeight: 30,
        fontFamily: "PingFangSC-Regular"
    },
    otherCompany: {
        fontSize: 12,
        fontFamily: "PingFangSC-Regular",
        color: "#999"
    },
    img: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginRight: 10
    },
});


class StagesScreen extends React.Component {
    state = {
        tab: "0",
        list: [],
        editList: false,
        details: {},
        orgData: []
    }

    listItemClick(item) {
        const { navigation } = this.props;
        navigation.navigate("ContractList", item)
    }

    chooseUser(item) {
        const { navigation } = this.props;
        navigation.navigate("AddUser", { ...item, stageId: navigation.state.params.id,userType:navigation.state.params.userType })
    }

    //获取合同列表
    getConList() {
        const { navigation } = this.props;
        request("/contract/findDataByItemStagesId", {
            params: {
                itemStagesId:navigation.state.params.id
                // itemStagesId: "508696013608123456"
            }
        }).then(res => {
            this.setState({ list: res.data })
        })
    }

    //获取项目组织
    getOrgList() {
        const { state } = this.props.navigation;
        request("/item-org/appFindStageOrg", {
            params: {
                id: state.params.id
            }
        }).then(res => {
            this.setState({
                orgData: res.data
            })
        })
    }

    getDetails() {
        const { state } = this.props.navigation;
        request("/item/getItemStageInfo", {
            params: {
                itemStageId: state.params.id
            }
        }).then(res => {
            this.setState({
                details: res.data,
                editValues: res.data
            })
        })
    }

    edit = () => {
        const { navigation } = this.props;
        navigation.navigate("EditStages", this.props.navigation.state.params)

    }

    getEnum() {
        requestEnum("com.servingcloud.spacexcloud.item.api.models.enums.TaxWayEnum,com.servingcloud.spacexcloud.item.api.models.enums.ProjectStatusEnum")
            .then(res => {
                const { TaxWayEnum, ProjectStatusEnum } = res.data;
                this.setState({
                    TaxWayEnum, ProjectStatusEnum
                })
            })
    }

    componentWillReceiveProps() {
        this.getDetails()
    }

    //初期可以把三个tab的所有内容都获取提高用户体验，后期内容多了再考虑优化。
    componentDidMount() {
        this.getEnum();
        this.getDetails();
        this.getOrgList();
        this.getConList();
    }

    render() {
        //右边的多个img显示
        const imgExtraGroup = (item) => {
            console.log(item)
            item && item.map((x, index) => {
                return <Image key={index} style={styles.img} source={{ uri: x.avatar || x.companyLogo || "" }} />
            })
        }
        const { list, details, editList, orgData, TaxWayEnum, ProjectStatusEnum } = this.state;
        const _this = this;
        const data = [
            { title: "项目分期编号", content: details.number, key: "number" },
            { title: "项目分期名称", content: details.name, key: "name" },
            { title: "项目分期状态", content: details.statusValue, key: "status", type: "select", selectOption: ProjectStatusEnum },
            { title: "计税方式", content: details.taxTypeValue, key: "taxType", type: "select", selectOption: TaxWayEnum },
            { title: "开票名称", content: details.ticketName, key: "ticketName" },
            { title: "项目分期位置", type: "Map", content: { latitude: details.latitude, longitude: details.longitude } },
        ];
        const tabs = [
            {
                title: "相关合同",
                content: <View style={styles.body}>
                    <View>
                        <List style={styles.list}>
                            {
                                list.map((item, index) =>
                                    <Item arrow="horizontal" multipleLine key={index} onClick={() => this.listItemClick(item)} style={styles.listItem}>
                                        <Text style={styles.itemTitle}>【{item.contractCategoryName}】{item.contractName}&nbsp;&nbsp;<Text style={styles.itemSum}>{item.statusName}</Text></Text>
                                        <Text style={styles.conNum}>{item.contractNumber}&nbsp;-&nbsp;<Text style={styles.itemSum}>最新金额:&nbsp;{item.newAmount}</Text></Text>
                                        {
                                            item.companyBname && <Text style={styles.otherCompany}>{item.companyBname}</Text>
                                        }
                                    </Item>
                                )
                            }
                        </List>
                    </View>
                </View>,
            },
            {
                title: "项目组织",
                content: <View style={styles.body}>
                    <View>
                        <List>
                            {
                                orgData.orgRoleResultList && orgData.orgRoleResultList.map((item, index) =>
                                    <Item activeStyle={false} arrow="horizontal" style={{ height: 80 }} multipleLine key={index} extra={imgExtraGroup(item.roleType === "3" ? item.orgCompanyResultList : item.orgPersonResultList)} onClick={() => this.chooseUser(item)} >
                                        {item.roleName}
                                        {imgExtraGroup(item.roleType === "3" ? item.orgCompanyResultList : item.orgPersonResultList)}
                                    </Item>
                                )
                            }
                        </List>
                    </View>
                </View>,
            },
            {
                title: "基本信息",
                content: <EditList data={data} edit={editList} setData={(obj) => _this.setState(obj)} />,
                rightTitle: true
            }
        ];
        const { state } = this.props.navigation;
        return (
            <View style={styles.container}>
                <BackWithTabs title={get(state, "params.name")} editFun={() => _this.edit()} tabs={tabs} rightTitle={"编辑"} />
            </View>
        )
    }
}

export default StagesScreen