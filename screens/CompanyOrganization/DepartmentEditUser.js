// Created by Lee on 2018/12/13
import React from 'react';
import { StyleSheet, View, ScrollView, Image,Text, TouchableOpacity } from "react-native";
import { WingBlank, Button, Checkbox, Toast, List, Modal } from "antd-mobile-rn";
import { createForm } from "rc-form";
import { BackHeader } from '../../components'
import { InputTemplet } from "../../utils";
import { bindActions } from "../../ducks/user";
import { connect } from "react-redux";
import {request,cleanParams} from "../../utils"
import { remove } from 'lodash';
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    listText:{
        fontSize: 15,
        paddingTop:15,
        paddingBottom:15
    },
    buttonTab:{
        paddingTop:20,
        paddingBottom:20,
        height:50,
        bottom:0,
        position:"absolute",
        width:'100%',
        backgroundColor:'#FFF'
    },
    buttonRight:{
        height:40,
        backgroundColor:'#067dc6',
        marginBottom:30,
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        borderColor:"#fff",
    },
    buttonLeft:{
        height:40,
        backgroundColor:'#ECF5FA',
        marginBottom:30,
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
    },
    ButtonViewRight:{
        position:'absolute',
        top:0,
        right:0,
        width:'50%'
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
  }
  );
  
const Item = List.Item;
class DepartmentEditUser extends React.Component{
    state={
        loading:false,
        UserList:[],
        name:"",
        id:"",
        parentId:"",
        companyId:"",
        checkedList:[],
    }
    //查找当前部门人员
    findDepartmentUser = () =>{
        const { id }=this.props.navigation.state.params;
        request('/company/findDepartmentUser',{
            method:'GET',
            params:{
                "page":1,
                "limit":10,
                noGroup:false,
                departmentId:id

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
    
    changeCheck(e, item) {
        let { checkedList } = this.state;
        if (e.target.checked) {
            checkedList.push(item.id)
        } else {
            remove(checkedList, x => x === item.id)
        }
        this.setState(
            {
                checkedList
            }
        )
    }

    bindUserToDepartment = () =>{
        let userId = [];
        userId = this.state.checkedList
        if(userId.length>0){
            const { id }=this.props.navigation.state.params;
            this.props.navigation.navigate("bindUserToDepartment",{
                confirmFun: this.findDepartmentUser,
                data:{
                    'userIds':userId,
                    'currDepartmentId':id
                }
            });
        }else{
            Toast.info('选择要移动的人员',2);
        }
    }
    removeDepartmentUser = () =>{
        // alert(this.state.userId)
        let userId = [];
        userId = this.state.checkedList
        if(userId.length>0){
            alert('提示', '确认移除操作?', [
                { text: '取消', onPress: () => console.log('cancel') , style: 'default' },
                { text: '确认', onPress: () =>{
                    const { id }=this.props.navigation.state.params;
                    request('/company/removeDepartmentUser',{
                        method:'POST',
                        body:{
                            'departmentId':id,
                            'userIds':userId
                        }
                    }).then(res=>{
                        if(res.code === 1){
                            Toast.success('修改成功',2);
                            setTimeout(() => {
                                this.findDepartmentUser();
                              }, 2000);
                            
                        }else{
                            Toast.info(res.msg,2)
                        }
                    })
                }},
              ]);
        }else{
            Toast.info('选择要移除的人员',2);
        }
        
    }
    
    componentWillMount() {
        const { id, name, parentId, companyId, }=this.props.navigation.state.params;
        this.setState({
            name:name,
            id:id,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            parentId:parentId,
            companyId:companyId,
        })
        this.findDepartmentUser();
    }
    render(){
        const {UserList, id} = this.state
        return(
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader title={this.props.navigation.state.params.name}/>
                </WingBlank>
                
                <View style={{}}>
                    <ScrollView style={{height:'100%'}}>
                        <List >
                            {
                                UserList.map((user, index) =>
                                <CheckboxItem 
                                key={index}
                                onChange={(e) =>{
                                    this.changeCheck(e,user)
                                }}
                                >
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
                                            <Text style={styles.ItemIphone}>{user.phone}</Text>
                                        </View>
                                    </View>
                                </CheckboxItem>
                                )
                            }
                        </List>
                    </ScrollView>
                </View>
                <View style={styles.buttonTab}>
                        <View style={styles.ButtonViewLeft}>
                            <Button type="ghost" style={styles.buttonLeft} activeStyle={false}
                            onClick={this.removeDepartmentUser} >
                            从部门移除
                            </Button>
                        </View>
                        <View style={styles.ButtonViewRight}>
                            <Button type="primary" style={styles.buttonRight} activeStyle={false}
                            onClick={this.bindUserToDepartment} >
                            移动至</Button>
                        </View>
                </View>
                {/* <ActivityIndicator toast animating={loading} /> */}
            </View>
        )
    }
}

export default createForm()(connect(
    ({ user,token }) => ({
      user,
      token
    }),
    dispatch => ({
        login: bindActions(dispatch).login,
    })
  )(DepartmentEditUser));