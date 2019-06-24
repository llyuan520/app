// Created by Lee on 2018/12/10
import React from 'react';
import { StyleSheet, View, Text,Image } from "react-native";
import {InputItem, WingBlank, Button, Toast} from "antd-mobile-rn";
import { BackHeader } from '../../components'
import {request} from "../../utils"
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    titleStyle:{
        fontSize: 26,
        fontWeight: "600",
        paddingBottom:40
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
      textTitle:{
        // textAlign:'left',
        fontSize:15,
        marginTop:20,
        // marginLeft:20
    },
    titleDot:{
        fontSize:15,
        color:'red',
        paddingRight:30
        
    },
    inputStyle:{
        marginTop:15,
        paddingLeft:0,
        paddingRight:0,
        marginLeft:0,
        marginRight:0,
        height:30
        
    },
    defaultImg:{
        width:20,
        height:20,
    },
    TextareaItem:{
        marginTop:15,
        paddingLeft:0,
        paddingRight:0,
        marginLeft:0,
        marginRight:0
    },
    buttonBox:{
        backgroundColor:"#fff",
        paddingTop:30
    },
    button:{
        height:40,
        backgroundColor:'#067dc6',
        marginBottom:10,
        marginTop:10,
        marginLeft:10,
        marginRight:10,
    }
  });

  
class Company extends React.Component{
    state={
        userId:[],
        names:'',
        department:{},
        name:'',
        flag:0
    }
    //选择部门主管回调
    addUser = (userList) => {
        if(userList.length > 0){
            let names = '';
            let userId = [];
            userList.forEach((user) =>{
                userId.push(user.id);
                names += user.name+' ';
            })
            this.setState({
                userId,
                names
            })
        }
    }
    //选择上级部门回调
    AddDepartment = (department) => {
        this.setState({
            department
        })
    }
    submitInfo = () => {
        const {name,department,userId,flag} = this.state;
        let params = {};
        if(name === ''){
            Toast.info('请填写部门名称',2)
            return;
        }else{
            params.name = name;
        }
        if(userId.length>0){
            params.managerIds = userId;
        }
        if(department){
            params.parentId = department.id
        }
        // alert(JSON.stringify(params));
        // return
        request('/company/addDepartment',{
            method:'POST',
            body:params
        }).then(res=>{
            if(res.code === 1){
                if(flag === 0 ){
                    this.props.navigation.navigate('Main');
                }else{
                    this.props.navigation.goBack();
                }
            }else{
                Toast.info(res.msg,2)
            }
        })
    }
    componentDidMount() {
        const { flag, department}=this.props.navigation.state.params;
        this.setState({
            flag,department
        })
    }
      
    render(){
       const {names,department,flag} = this.state;
        return(
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader isHome={ flag === 0 ? true : false} />
                    <Text style={styles.titleStyle}>
                        {
                           flag === 0 ?  '添加部门' 
                           : '添加子部门'
                        }   
                    </Text>
                    <View >
                        <View>   
                            <Text style={styles.textTitle}>
                                <Text style={styles.titleDot}>{"* "}</Text>
                                部门名称
                            </Text>
                            <InputItem
                                style={styles.inputStyle}
                                type={InputItem}
                                onChange={(e)=>{
                                    this.setState({
                                        name:e
                                    })
                                }}
                                placeholder = '请填写部门名称'
                                clear={true} 
                                maxLength={ 20 }// 最大长度
                            />
                        </View>

                        
                        <View>   
                            <Text style={styles.textTitle}>
                            部门主管
                            </Text>
                            <InputItem
                                style={styles.inputStyle}
                                type={InputItem}
                                value={names}
                                editable = {false}
                                extra={
                                    <Image
                                        source={require('../../statics/images/pulldown.png')}
                                        style={styles.defaultImg}
                                    />
                                }
                                onExtraClick = {() =>{
                                        this.props.navigation.navigate("AddDepartmentUser",{confirmFun: this.addUser});
                                    }
                                }
                                placeholder = '选择部门主管'
                                clear={true} 
                                maxLength={ 20 }// 最大长度
                            />
                        </View>
                        <View>   
                            <Text style={styles.textTitle}>
                            上级部门
                            </Text>
                            {
                                flag === 0 ?
                                <InputItem
                                style={styles.inputStyle}
                                type={InputItem}
                                value={department.name}
                                editable = {false}
                                extra={
                                    <Image
                                        source={require('../../statics/images/pulldown.png')}
                                        style={styles.defaultImg}
                                    />
                                }
                                onExtraClick = {() =>{
                                        this.props.navigation.navigate("SelDepartment",{
                                            confirmFun: this.AddDepartment,
                                            title:'添加上级部门',
                                            Jump:'addDepartment'
                                        });
                                    }
                                }
                                placeholder = '选择上级部门'
                                clear={true} 
                                maxLength={ 20 }// 最大长度
                            />
                            :
                            <InputItem
                                style={styles.inputStyle}
                                type={InputItem}
                                value={department.name}
                                editable = {false}
                            />
                            }
                        </View>
                    </View>
                </WingBlank>
                <View style={styles.buttonBox}>
                    <Button type="primary" style={styles.button} onClick={this.submitInfo}>保存</Button>
                </View>
            </View>
        )
    }
}

export default Company