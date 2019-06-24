// Created by Lee on 2018/12/13
import React from 'react';
import { StyleSheet, View, ScrollView, Image,Text, TouchableOpacity } from "react-native";
import { WingBlank,Button,ActivityIndicator, Toast, List, InputItem } from "antd-mobile-rn";
import { createForm } from "rc-form";
import { BackHeader } from '../../components'
import { InputTemplet } from "../../utils";
import { bindActions } from "../../ducks/user";
import { connect } from "react-redux";
import {request,cleanParams} from "../../utils"
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
        marginTop:20,
        marginBottom:20,
        height:50,
        bottom:0,
        position:"absolute",
        width:'100%'
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
const Brief = Item.Brief;
class DepartmentDetail extends React.Component{
    state={
        loading:false,
        list:[],
        UserList:[],
        name:"",
        id:"",
        parentId:"",
        companyId:"",
    }

    //查找二级部门接口
    findDepartment = () =>{
        const { id }=this.props.navigation.state.params;
        request('/company/findDepartment',{
            method:'GET',
            params:{
                "parentId": id,
                "page":1,
                "limit":10
            }
        }).then(res=>{
            // alert(JSON.stringify(res))
            // return;
            if(res.code === 1){
                this.setState({
                    list:res.data.list
                })
            }else{
                Toast.info(res.msg,2)
            }
        })
    }
    //查找当前部门人员
    findDepartmentUser = () =>{
        const { id }=this.props.navigation.state.params;
        request('/company/findDepartmentUser',{
            method:'GET',
            params:{
                // "parentId": this.props.user.company_id,
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
    //绑定员工到部门
    addUser = (userList) =>{
        if(userList.length > 0){
            let userId = [];
            userList.forEach((user) =>{
                userId.push(user.id);
            })
            request('/company/bindUserToDepartment',{
                method:'POST',
                body:{
                    "currDepartmentId":'',
                    "newDepartmentIds":[this.state.id],
                    "staffId":userId
                }
            }).then(res=>{
                if(res.code === 1){
                    this.findDepartmentUser();
                }else{
                    Toast.info(res.msg,2)
                }
            })
        }
    }
    listItemClick = (item) =>{
        if(item){
            alert(JSON.stringify(item))
        }else{
            alert(11111)
        }
    }
    onBranch = () =>{
        this.props.navigation.navigate("addDepartment",{
            flag:1,
            department:this.props.navigation.state.params
        });
    }
    //编辑人员
    edit = () =>{
        this.props.navigation.navigate("DepartmentEditUser",this.props.navigation.state.params);
    }
    //设置部门
    settings = () =>{
        this.props.navigation.navigate("DepartmentSettings",{
            id:this.props.navigation.state.params.id
        });
    }
    componentWillMount() {
        const { id, name, parentId, companyId, }=this.props.navigation.state.params;
        this.setState({
            name:name,
            id:id,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            parentId:parentId,
            companyId:companyId,
        })
        this.findDepartment();
        this.findDepartmentUser();
        // this.setState({CompanyId:CompanyId});
    }
    render(){
        const {list, name, UserList, id} = this.state
        return(
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader 
                    title={name}
                    isHome={true}
                    NavRight = {{
                        edit: this.edit,
                        settings: this.settings
                    }}
                    />
                </WingBlank>
                <View style={{height:300}}>
                    <ScrollView>
                        <List >
                            {
                                list.map((item, index) =>
                                    <Item arrow="horizontal" key={index} onClick={() => this.listItemClick(item)} >
                                        <Text style={styles.listText}>{item.name}</Text>
                                    </Item>
                                )
                            }
                        </List>
                    </ScrollView>
                </View>


                <View style={{height:300,borderTopWidth:15,borderTopColor:'#f2f2f2'}}>
                    <ScrollView>
                        <List >
                            {
                                UserList.map((user, index) =>
                                <Item 
                                key={index}
                                onClick={() => {}}
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
                                            <Text style={styles.ItemIphone}>13031792210</Text>
                                        </View>
                                    </View>
                                </Item>
                                )
                            }
                        </List>
                    </ScrollView>
                </View>
                <View style={styles.buttonTab}>
                        <View style={styles.ButtonViewLeft}>
                            <Button type="ghost" style={styles.buttonLeft} activeStyle={false}
                             onClick={this.onBranch} >
                            添加子部门
                            </Button>
                        </View>
                        <View style={styles.ButtonViewRight}>
                            <Button type="primary" style={styles.buttonRight} activeStyle={false}
                            onClick={() =>{
                                this.props.navigation.navigate("CompanyOrganizationUser",{
                                    confirmFun: this.addUser,
                                    url:'/company/findDepartmentUserWithManagerSort',
                                    data:{departmentId:id},
                                    title:'添加成员',
                                    goBack:'DepartmentDetail'
                                });
                             }} >
                            添加成员</Button>
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
  )(DepartmentDetail));