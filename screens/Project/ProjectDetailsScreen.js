import React from 'react';
import { StyleSheet, View, Text, } from "react-native";
import {
    List, Toast
} from "antd-mobile-rn";
import { BackWithTabs, EditList, BottomButton } from '../../components';
import { request } from "../../utils";
import { createForm } from "rc-form";
import { get } from 'lodash'


const Item = List.Item;
const Brief = Item.Brief;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        marginTop: 40,
        height: 44,
        flex: 1
    },
    tabs: {
        height: 28,
        width: 180,
        borderRadius: 8,
    },
    body: {
        backgroundColor: '#fff',
    },
    listItem: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        backgroundColor: '#fff',
    },
    textTitle: {
        // textAlign:'left',
        fontSize: 15,
        marginTop: 20,
        // marginLeft:20
    },
    titleDot: {
        fontSize: 15,
        color: 'red',
        paddingRight: 30

    },
});


class ProjectDetails extends React.Component {
    state = {
        tab: "0",
        list: [],
        editList: false,
        details: {},
        title: this.props.navigation.state.params.name,
        latlng: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    }
    changeTab(e) {
        console.log(e)
        let tab = "0";
        if (e.title === "项目分期") {
            tab = "0"
        } else {
            //我参与的
            tab = "1";
            this.getDetails()
        }
        this.setState({ tab })
    }

    listItemClick(item) {
        const { navigation } = this.props;
        const { name, id } = item;
        navigation.navigate("StagesList", { name, id })
    }

    getList() {
        const { state } = this.props.navigation;
        request("/item/getStagesByItemId", {
            params: {
                itemId: state.params.id
            }
        }).then(res => {
            this.setState({
                list: res.data
            })
        })
    }

    getDetails() {
        const { state } = this.props.navigation;
        request("/item/getItemInfo", {
            params: {
                id: state.params.id
            }
        }).then(res => {
            this.setState({ details: res.data, title: res.data.name, editValues: res.data })
        })
    }

    addStages = () => {
        //exist表示已存在的项目，不是新建。
        this.props.navigation.navigate("AddItemStages", {
            exist: true,
            itemId: this.props.navigation.state.params.id
        })
    }

    edit() {
        this.props.navigation.navigate("AddItem", {
            exist: true,
            itemId: this.props.navigation.state.params.id
        })
    }

    saveDetails() {
        let body = this.state.editValues;
        body.id = get(this.props, "navigation.state.params.id")
        request("/item/update", {
            body, method: "POST"
        }).then(res => {
            if (res.code === 1) {
                Toast.success(res.msg);
                this.getDetails();
            }
        })
    }

    componentDidMount() {
        this.getList()
    }

    render() {
        const { list, editList, details, tab, title, latlng } = this.state;
        const data = [
            { title: "项目编号", content: details.number, key: "number" },
            { title: "项目名称", content: details.name, key: "name" },
            { title: "项目简称", content: details.simpleName, key: "simpleName" },
            { title: "项目位置", content: "111",type:"Map" },
        ];
        const { state } = this.props.navigation;
        const _this = this;
        console.log(editList)
        let tabs = [
            {
                title: "项目分期",
                content:
                    <View style={styles.body}>
                        <View>
                            <List className="my-list">
                                {
                                    list.map((item, index) =>
                                        <Item arrow="horizontal" multipleLine key={index} onClick={() => this.listItemClick(item)} style={styles.listItem}>
                                            {item.name}
                                            <Brief style={styles.Brief}>{item.id}</Brief>
                                        </Item>
                                    )
                                }
                            </List>
                        </View>
                    </View>,
            },
            {
                title: "项目详情",
                rightTitle: true,
                content:
                <EditList data={data} edit={editList} setData={(obj) => _this.setState(obj)} />
            }
        ];
        return (
            <View style={styles.container}>
                <BackWithTabs title={title} tabs={tabs} editFun={() => _this.edit()} rightTitle={editList ? "保存" : "编辑"}  onChange={this.changeTab.bind(this)} />
                {
                    tab === "0" &&
                    <BottomButton onClick={this.addStages}>新增项目分期</BottomButton>
                }
            </View>
        )
    }
}

export default createForm()(ProjectDetails)