// Created by Luoshj on 2018/12/19
import React from 'react';

import { createForm } from "rc-form";
import { bindActions } from "../../ducks/user";
import { connect } from "react-redux";

import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { List, WingBlank, Radio, Checkbox } from 'antd-mobile-rn';
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
        paddingTop:10,
        paddingBottom:10
    },
    ItemIphone:{
        color:'#888888',
        paddingLeft:10,
        paddingTop:20
    }
});

class SelDepartment extends React.Component {

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

    confirm() {
        console.log('=================');
        console.log({
            id:this.props.navigation.state.params && this.props.navigation.state.params.id ? this.props.navigation.state.params.id:undefined,
            item:this.props.navigation.state.params && this.props.navigation.state.params.item ? this.props.navigation.state.params.item:undefined,
            formValue:this.props.navigation.state.params && this.props.navigation.state.params.formValue ? this.props.navigation.state.params.formValue:undefined,
        });
        this.props.navigation.state.params.confirmFun(this.state.department);
        this.props.navigation.navigate(this.props.navigation.state.params.Jump,{
            id:this.props.navigation.state.params && this.props.navigation.state.params.id ? this.props.navigation.state.params.id:undefined,
            item:this.props.navigation.state.params && this.props.navigation.state.params.item ? this.props.navigation.state.params.item:undefined,
            formValue:this.props.navigation.state.params && this.props.navigation.state.params.formValue ? this.props.navigation.state.params.formValue:undefined,
        });
    }


    componentDidMount() {
        this.getList()
    }
    onChange = (item) => {
        this.setState({
            department:item,
        });
      };
    render() {
        
        const { DataList,department } = this.state;
        return (
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader title={this.props.navigation.state.params.title} backIcon={<Icon name="md-close" />} confirm={{ text: "确定", fun: this.confirm.bind(this) }} />
                    
                    <View>
                    <ScrollView>
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
  )(SelDepartment));