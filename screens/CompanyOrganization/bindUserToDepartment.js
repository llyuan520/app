// Created by Luoshj on 2018/12/19
import React from 'react';

import { createForm } from "rc-form";
import { bindActions } from "../../ducks/user";
import { connect } from "react-redux";

import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { List, WingBlank, Radio, Toast } from 'antd-mobile-rn';
import { Icon, BackHeader } from '../../components'
import { request } from '../../utils';
import { Brief } from 'antd-mobile-rn/lib/list/ListItem.native';
import { remove, get } from 'lodash';
const Item = List.Item;
const RadioItem = Radio.RadioItem;
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
    ItemName:{
        fontSize:18,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        paddingBottom:10
    }
});

class bindUserToDepartment extends React.Component {

    state = {
        DataList: [],
        checkedList:[],
        department:{}
    }

    chooseList = get(this.props.navigation.state.params, "chooseList");
    getList() {
        request('/company/findAllDepartment',{
            method:'GET',
            params:{
                "page":1,
                "limit":10,
            }
        }).then(res=>{
            if(res.code === 1){
                this.setState({
                    DataList:res.data.list
                })
            }else{
                Toast.info(res.msg,2)
            }
        })
    }

    confirm =()=> {
        const {currDepartmentId,userIds} = this.props.navigation.state.params.data
        const param = {
            "currDepartmentId":currDepartmentId,
            "newDepartmentIds":[this.state.department.id],
            "staffId":userIds
        }
        request('/company/bindUserToDepartment',{
            method:'POST',
            body:param
        }).then(res=>{
            if(res.code === 1){
                Toast.success('修改成功',2);
                setTimeout(() => {
                    this.props.navigation.state.params.confirmFun();
                    this.props.navigation.goBack();
                    }, 2000);
            }else{
                Toast.info(res.msg,2)
            }
        })
    }
    onChange = (item) => {
        this.setState({
            department:item,
        });
      };
    componentDidMount() {
        // this.props.navigation.state.params
        this.getList()
    }
    
    render() {
        const { DataList,department } = this.state;
        return (
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader title={'选择部门'} confirm={{ text: "确定", fun: this.confirm }} />
                    <View>
                        <ScrollView style={{height:'100%'}}>
                            <List >
                                {
                                    DataList.map((item, index) =>
                                    <RadioItem 
                                    key={index}
                                    checked={department.id === item.id}
                                    onChange={() => this.onChange(item)}
                                    >
                                        <View style={{display:'flex',flexDirection: 'row'}}>
                                            <View>
                                                <Text style={styles.ItemName}>{item.name}</Text>
                                            </View>
                                        </View>
                                    </RadioItem>
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
    ({ user }) => ({
      user
    }),
    dispatch => ({
        login: bindActions(dispatch).login,
    })
  )(bindUserToDepartment));