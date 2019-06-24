// Created by Luoshj on 2018/12/19
import React from 'react';

import { createForm } from "rc-form";
import { bindActions } from "../../ducks/user";
import { connect } from "react-redux";

import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
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

    Logo:{
        width: 40, height: 40,
        marginTop:10,
        marginBottom:10,
        borderRadius:20,
    },
    ItemName:{
        fontSize:18,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:20
    },
    ItemIphone:{
        color:'#888888',
        paddingLeft:10,
        paddingTop:20
    }
});

class AddDepartmentUser extends React.Component {

    state = {
        UserList: [],
        checkedList:[]
    }

    chooseList = get(this.props.navigation.state.params, "chooseList");
    getList() {
        const {user} = this.props;
        request('/company/findCompanyUser',{
            method:'GET',
            params:{
                "page":1,
                "limit":10,
                companyId :user.company_id

            }
        }).then(res=>{
            if(res.code === 1){
                this.setState({
                    UserList:res.data.list
                })
            }else{
                Toast.info(res.msg,2)
            }
        })
    }

    confirm() {
        this.props.navigation.state.params.confirmFun(this.state.checkedList);
        if(this.props.navigation.state.params.Jump){
            this.props.navigation.navigate(this.props.navigation.state.params.Jump);
        }else{
            this.props.navigation.navigate("addDepartment");
        }
        
    }

    changeCheck(e, item) {
        let { checkedList } = this.state;
        if (e.target.checked) {
            // alert(JSON.stringify(item))
            checkedList.push(item)
        } else {
            remove(checkedList, x=>x.id===item.id)
        }
        this.setState(
            {
                checkedList
            }
        )
    }

    componentDidMount() {
        this.getList()
    }

    render() {
        const { UserList } = this.state;
        return (
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader title={'添加部门主管'} backIcon={<Icon name="md-close" />} confirm={{ text: "确定", fun: this.confirm.bind(this) }} />
                    {/* <TextInput
                        style={{ height: 40, backgroundColor: "#F2F2F2"}}
                        placeholder="搜索"
                    /> */}
                    <SearchBar placeholder="搜索" maxLength={8} />
                    <View style={{borderTopWidth:15,borderTopColor:'#f2f2f2'}}>
                    <ScrollView>
                        <List >
                            {
                                UserList.map((user, index) =>
                                <Item 
                                key={index}
                                extra={<Checkbox defaultChecked={user.checked} onChange={(e) => this.changeCheck(e, user)} />}>
                                
                                    <View style={{display:'flex',flexDirection: 'row'}}>
                                        <View >
                                            <Image
                                            style={styles.Logo}
                                            source={{uri: user.avatar}}
                                            />
                                        </View>
                                        <View>
                                            <Text style={styles.ItemName}>{user.name}</Text>
                                        </View>
    
                                        <View>
                                            <Text style={styles.ItemIphone}>13031792210</Text>
                                        </View>
                                    </View>
                                </Item>
                                )
                            }
                        </List>
                    </ScrollView>
                </View>
                </WingBlank>
            </View>
        )
    }
}

export default (connect(
    ({ user,token }) => ({
      user
    }),
    dispatch => ({
        login: bindActions(dispatch).login,
    })
  )(AddDepartmentUser));