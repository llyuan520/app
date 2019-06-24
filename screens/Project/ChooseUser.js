import React from 'react';
import { View, StyleSheet, Text, TextInput, Image } from 'react-native';
import { List, WingBlank, SearchBar, Checkbox } from 'antd-mobile-rn';
import { Icon, BackHeader } from '../../components'
import { request } from '../../utils';
import { Brief } from 'antd-mobile-rn/lib/list/ListItem.native';
import { remove, get } from 'lodash';
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        marginTop: 20,
        height: 44,
        lineHeight: 44
    },
    title: {
        fontSize: 16,
        color: "#2B2B2B",
        textAlign: "center"
    },
    confirmText: {
        fontSize: 14,
        color: "#067DC6",
        position: "absolute",
        right: 0,
        top: 10
    },
    img: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginRight: 10
    },
});

class ChooseUser extends React.Component {

    state = {
        data: []
    }

    chooseList = get(this.props.navigation.state.params, "chooseList");

    confirm() {
        const {navigation}=this.props;
        navigation.state.params.confirmFun(this.chooseList,navigation.state.params.companyId);
        navigation.navigate("AddUser");
    }

    changeCheck(e, item) {
        if (e.target.checked) {
            this.chooseList.push(item)
        } else {
            remove(this.chooseList, x => x.userId === item.userId)
        }
    }

    getList(condition) {
        console.log(condition)
        const { url, params, companyId } = this.props.navigation.state.params;
        request(url, { params: { ...params, companyId, condition } }).then(res => {
            res.data.list && res.data.list.forEach((item) => {
                this.chooseList.forEach(x => {
                    if (item.userId && item.userId === x.userId) {
                        item.checked = true
                    }
                    if (item.companyId && item.companyId === x.companyId) {
                        item.checked = true
                    }
                })
            })
            this.setState({
                data: res.data.list
            })
        })
    }

    componentDidMount() {
        this.getList()
    }

    componentWillUnmount() {
        this.chooseList = []
    }

    render() {
        const { title, confirmFun, itemTitle } = this.props.navigation.state.params;
        const { data } = this.state;
        return (
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader title={title} backIcon={<Icon name="md-close" />} confirm={{ text: "确认", fun: this.confirm.bind(this) }} />
                    {/* <TextInput
                        style={{ height: 40, backgroundColor: "#F2F2F2"}}
                        placeholder="搜索"
                    /> */}
                    <SearchBar placeholder="搜索" maxLength={11} onSubmit={e => this.getList(e)} />
                    <List >
                        {
                            data && data.map((item, index) =>
                                <Item
                                    key={index}
                                    style={styles.listItem}
                                    thumb={<Image style={styles.img}
                                        source={{ uri: item.avatar }} />}
                                    extra={<Checkbox defaultChecked={item.checked} onChange={(e) => this.changeCheck(e, item)} />}>
                                    {item[itemTitle] || item.userName}
                                    <Brief>{item.phone}</Brief>
                                </Item>
                            )
                        }
                    </List>
                </WingBlank>
            </View>
        )
    }
}

export default ChooseUser