import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { Accordion, WingBlank, List } from 'antd-mobile-rn';
import { BackWithTabs, BottomButton } from '../../components'
import { request } from '../../utils';

const Item = List.Item;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

class AddItemOrg extends React.Component {
    state = {
        stages: [{ name: "项目分期名称" }],
        roleList: []
    }

    nextStep = () => {
        this.props.navigation.navigate("Home")
    }

    getRoleList() {
        request("/item/getItemRole", {
            params: {
                itemId: this.props.navigation.state.params.itemId,
                itemStageId: ""
            }
        })
            .then(res => {
                this.setState({
                    roleList: res.data
                })
            })
    }

    getStageList() {
        request("/item-org/getItemOrg", {
            params: {
                itemId: this.props.navigation.state.params.itemId,
            }
        }).then(res => {
            res && this.setState({
                stages: res.data.stageList
            })
        })
    }

    toChooseUser(item, stageId) {
        //跳转选择具体人员的界面
        console.log(item);
        this.props.navigation.navigate("AddUser", { ...item, stageId })
    }

    componentDidMount() {
        this.getRoleList();
        this.getStageList();
    }

    //新建项目第三步，新建项目组织
    render() {
        const { stages, roleList } = this.state;
        console.log(this.state)
        return (
            <View style={styles.container}>
                <WingBlank>
                    <BackWithTabs isPaddingBottom={true} title="新建项目组织" />
                </WingBlank>
                <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                    {
                        stages.map((x, index) =>
                            <Accordion.Panel key={index} header={x.itemStageName}>
                                <List >
                                    {
                                        roleList.map((item, index) => <Item key={index} arrow="horizontal" multipleLine onClick={() => this.toChooseUser(item, x.itemStageId)}>
                                            <Text>&nbsp;&nbsp;&nbsp;&nbsp;{item.roleName}</Text>
                                        </Item>)
                                    }
                                </List>
                            </Accordion.Panel>)
                    }
                </Accordion>
                <BottomButton onClick={this.nextStep}>保存</BottomButton>
            </View>
        )
    }
}

export default AddItemOrg