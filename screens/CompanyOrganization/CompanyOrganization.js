// Created by Luoshj on 2018/12/17
import React from 'react';
import { StyleSheet, View, Image, Text,ScrollView } from "react-native";
import { List, Button, ActivityIndicator } from "antd-mobile-rn";
import { createForm } from "rc-form";
import { bindActions } from "../../ducks/user";
import { connect } from "react-redux";
import { withNavigation } from 'react-navigation';
import {request, cleanParams} from "../../utils"

const Item = List.Item;
const Brief = Item.Brief;
const styles = StyleSheet.create({
    listItem: {
        // height: 80e
        // paddingTop:10,
        // paddingBottom:10,
        // marginTop:10,
        // marginBottom:10,
        // borderBottomWidth:0
    },
    Brief: {
        overflow: "hidden",
    },
    Logo:{
        width: 40, height: 40,
        marginTop:5,
        marginBottom:5,
        borderRadius:20,
    },
    titleStyle:{
        fontSize: 18,
        fontWeight: "600",
        // color:"red"
    },
    listText:{
        fontSize: 18,
        paddingTop:10,
        paddingBottom:10
    },
    buttonTab:{
        marginTop:20,
        marginBottom:20,
        height:50
    },
    buttonRight:{
        height:40,
        backgroundColor:'#067dc6',
        marginBottom:10,
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        borderColor:"#fff",
    },
    buttonLeft:{
        height:40,
        backgroundColor:'#ECF5FA',
        marginBottom:10,
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        borderColor:"#ECF5FA",
        borderWidth:2
    },
    ButtonViewLeft:{
        position:'absolute',
        top:0,
        left:0,
        width:'50%',
        // addDepartment
    },
    ButtonViewRight:{
        position:'absolute',
        top:0,
        right:0,
        width:'50%'
    }
});

class CompanyOrganization extends React.Component{
    state={
        list:[],
        loading:true,
        count:0
    }
    //查找一级部门接口
    findDepartment = () =>{
        // /company/findDepartment
        request('/company/findDepartment',{
            method:'GET',
            params:{
                // "parentId": this.props.user.company_id,
                "page":1,
                "limit":10
            }
        }).then(res=>{
            // alert(JSON.stringify(res))   
            if(res.code === 1){
                this.setState({
                    list:res.data.list
                })
            }else{
                Toast.info(res.msg,2)
            }
        })
    }
    //查找未分组人数接口
    findDepartmentUser = () =>{
        request('/company/findDepartmentUser',{
            method:'GET',
            params:{
                // "parentId": this.props.user.company_id,
                "page":1,
                "limit":10,
                noGroup:true,
                departmentId:'www'

            }
        }).then(res=>{
            // alert(JSON.stringify(res))   
            if(res.code === 1){
                this.setState({
                    count:res.data.total
                })
            }else{
                Toast.info(res.msg,2)
            }
        })
        
    }
    listItemClick = (item) =>{
        if(item){
            // alert(JSON.stringify(item))
            this.props.navigation.navigate("DepartmentDetail",item);
        }else{
            alert(11111)
        }
    }
    componentWillMount() {
        this.findDepartment();
        this.findDepartmentUser();
        
    }
    render(){
        const {companyName} = this.props.user;
        const {loading, list, count} = this.state;
        return(
            <View>
                <List >
                    <Item 
                        extra={
                            <Image
                            style={styles.Logo}
                            source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                            />
                        } 
                        >
                        <Text style={styles.titleStyle}>{companyName}</Text>
                    </Item>
                </List>
                <View style={styles.buttonTab}>
                        <View style={styles.ButtonViewLeft}>
                            <Button type="ghost" style={styles.buttonLeft} activeStyle={false}
                             onClick={() =>{
                                this.props.navigation.navigate("addDepartment",{
                                    flag:0,
                                    department:{}
                                });
                             }} >
                            添加部门
                            </Button>
                        </View>
                        <View style={styles.ButtonViewRight}>
                            <Button type="primary" style={styles.buttonRight} activeStyle={false}
                            onClick={() =>{
                                this.props.navigation.navigate("InvitationUser");
                             }} >
                            邀请同事加入</Button>
                        </View>
                </View>
                <View>
                    <ScrollView style={{height:'100%'}}>
                        <List >
                            <Item arrow="horizontal" key={999} onClick={() => this.listItemClick(null)} >
                                    <Text style={styles.listText}>未分组 ({count})</Text>
                                </Item>
                            {
                                list.map((item, index) =>
                                    <Item arrow="horizontal" key={index} onClick={() => this.listItemClick(item)} >
                                        <Text style={styles.listText}>{item.name} ({item.count})</Text>
                                    </Item>
                                )
                            }
                        </List>
                    </ScrollView>
                    
                </View>
                {/* <ActivityIndicator toast animating={loading} /> */}
            </View>
        )
    }
}

export default connect(
    ({ user }) => ({
      user
    }),
    dispatch => ({
        login: bindActions(dispatch).login,
    })
  )(withNavigation(createForm()(CompanyOrganization)));