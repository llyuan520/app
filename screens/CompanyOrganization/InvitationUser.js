// Created by Lee on 2018/12/10
import React from 'react';
import { StyleSheet, View, Text,Image, ScrollView } from "react-native";
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
        phone:'',
        position:''
    }
    
    //选择上级部门回调
    AddDepartment = (department) => {
        this.setState({
            department
        })
    }
    submitInfo = () => {
        const {name,department,phone,position} = this.state;
        let params = {};
        if(phone === ''){
            Toast.info('请填写电话号码',2)
            return;
        }else{
            params.phone = phone;
        }
        if(name === ''){
            Toast.info('请填写真实姓名',2)
            return;
        }else{
            params.name = name;
        }
        if(department){
            params.departmentId = department.id
        }
        if(position !==''){
            params.position = position
        }
        // alert(JSON.stringify(params));
        request('/company/inviteCompanyUser',{
            method:'POST',
            body:params
        }).then(res=>{
            // alert(JSON.stringify(res))
            // return;
            if(res.code === 1){
                this.props.navigation.navigate('Main');
            }else{
                Toast.info(res.msg,2)
            }
        })
    }
    componentDidMount() {
    }
      
    render(){
       const {department} = this.state;
        return(
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader isHome={true} />
                    <Text style={styles.titleStyle}>
                        邀请同事加入    
                    </Text>
                    <View >
                        <ScrollView>
                            <View>   
                                <Text style={styles.textTitle}>
                                    <Text style={styles.titleDot}>{"* "}</Text>
                                    电话号码
                                </Text>
                                <InputItem
                                    style={styles.inputStyle}
                                    type="phone"
                                    onChange={(e)=>{
                                        this.setState({
                                            phone:e
                                        })
                                    }}
                                    placeholder = '请填电话号码'
                                    clear={true} 
                                    maxLength={ 11 }// 最大长度
                                />
                            </View>
                            <View>   
                                <Text style={styles.textTitle}>
                                    <Text style={styles.titleDot}>{"* "}</Text>
                                    真实姓名
                                </Text>
                                <InputItem
                                    style={styles.inputStyle}
                                    type={InputItem}
                                    onChange={(e)=>{
                                        this.setState({
                                            name:e
                                        })
                                    }}
                                    placeholder = '请填真实姓名'
                                    clear={true} 
                                    maxLength={ 20 }// 最大长度
                                />
                            </View>
                            <View>   
                                <Text style={styles.textTitle}>
                                    部门
                                </Text>
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
                                                title:'选择部门',
                                                Jump:'InvitationUser'
                                            });
                                        }
                                    }
                                    placeholder = '选择部门'
                                    clear={true} 
                                    maxLength={ 20 }// 最大长度
                                />
                            </View>
                            <View>   
                                <Text style={styles.textTitle}>
                                    职位
                                </Text>
                                <InputItem
                                    style={styles.inputStyle}
                                    type='InputItem'
                                    onChange={(e)=>{
                                        this.setState({
                                            position:e
                                        })
                                    }}
                                    placeholder = '请填职位'
                                    clear={true} 
                                    maxLength={ 20 }// 最大长度
                                />
                            </View>
                            </ScrollView>
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