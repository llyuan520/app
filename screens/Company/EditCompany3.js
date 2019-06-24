// Create by luoshj on 2018/12/13
import React from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView,Text, TouchableOpacity } from "react-native";
import { WingBlank,Button,ActivityIndicator, Toast } from "antd-mobile-rn";
import { createForm } from "rc-form";
import { BackHeader } from '../../components'
import { InputTemplet } from "../../utils";
import { bindActions } from "../../ducks/user";
import { connect } from "react-redux";
import {request, cleanParams} from "../../utils"
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    buttonBox:{
        backgroundColor:"#fff",
        borderTopColor:'#BBBBBB',
        borderTopWidth:1,
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

  
class EditCompany3 extends React.Component{
    state={
        loading:false,
        id:"",
        CompanyId:"",
        companyPhone:"",//公司电话
        facsimile:"",//传真号码
        companyEmail:"",//公司邮箱
        locationAddress:"",// 所在地详情地址
        registerAddress:"",//注册地详情地址
        synopsis:"",//简介
        
    }
    submitInfo = ()=>{
        this.props.form.validateFields({ force: true }, (error,value) => {//校验并获取一组输入域的值
            if(error){
                Toast.info('您有未填写的必填项或者格式有误！',2)
            }else{
                const userId = this.props.user.userId;
                let companyContact = value;
                if(this.state.id === ''){
                    companyContact.companyId = this.props.user.company_id
                }else{
                    companyContact.id = this.state.id
                }
                cleanParams(companyContact);
                request('/company/updateCompany',{
                    method:'POST',
                    body:{
                        "companyContact": companyContact,
                        "userId": userId
                    }
                }).then(res=>{
                    if(res){
                    this.setState({
                        loading:false
                    })
                        this.props.navigation.navigate("CompanyHome");
                    }else{
                        Toast.info(res.msg,2)
                    }
                })
            }
        })
    }
    //查企业详情
    CompanyDetail = () =>{
        request('/company/findCurrCompanyDetail',{
            method:'GET',
            params:{}
        }).then(res=>{
            if(res){
                if(res.data.companyContact){
                    const { companyPhone, facsimile, companyEmail, locationAddress, id,
                        registerAddress, synopsis } = res.data.companyContact;
                    this.setState( { companyPhone, facsimile, companyEmail, locationAddress, id,
                        registerAddress, synopsis })    
                }
            }
        })
    }
    componentWillMount() {
        this.CompanyDetail();
    }
    render(){
        const { loading, companyPhone, facsimile, companyEmail, locationAddress, registerAddress, synopsis } = this.state;
        return(
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader title={'企业信息'}/>
                </WingBlank>
                <View style={{ flex: 1 }}>
                    <KeyboardAvoidingView 
                    behavior="padding"
                    keyboardVerticalOffset={150}
                    >
                        <ScrollView>
                            <WingBlank>
                                {
                                    InputTemplet(this.props.form, 
                                        [{
                                            type:"Number",
                                            label:"公司电话",
                                            fieldName:"companyPhone",
                                            fieldDecoratorOptions:{
                                                initialValue:`${companyPhone}`,
                                                rules: [
                                                    {
                                                        required: true,
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: `${companyPhone}`,
                                            }
                                        },
                                        {
                                            type:"InputItem",
                                            label:"传真号码",
                                            fieldName:"facsimile",
                                            fieldDecoratorOptions:{
                                                initialValue:facsimile,
                                                rules: [
                                                    {
                                                        
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: facsimile,
                                            }
                                        },
                                        {
                                            type:"InputItem",
                                            label:"公司邮箱",
                                            fieldName:"companyEmail",
                                            fieldDecoratorOptions:{
                                                initialValue:companyEmail,
                                                rules: [
                                                    {
                                                        
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: companyEmail,
                                            }
                                        },
                                        {
                                            type:"Textarea",
                                            label:"注册地详情地址",
                                            fieldName:"registerAddress", 
                                            fieldDecoratorOptions:{
                                                initialValue:registerAddress,
                                                rules: [
                                                    {
                                                        required: true,
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: registerAddress,
                                            }
                                        },
                                        {
                                            type:"Textarea",
                                            label:"所在地详情地址",
                                            fieldName:"locationAddress", 
                                            fieldDecoratorOptions:{
                                                initialValue:locationAddress,
                                                rules: [
                                                    {
                                                        required: true,
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: locationAddress,
                                            }
                                        },
                                        {
                                            type:"Textarea",
                                            label:"企业简介",
                                            fieldName:"synopsis", 
                                            fieldDecoratorOptions:{
                                                initialValue:synopsis,
                                                rules: [
                                                    {
                                                       
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: synopsis,
                                            }
                                        }
                                    ],
                                         (key, data) =>{
                                            this.setState({
                                                [key]: data
                                            })
                                         }
                                    )
                                }
                            </WingBlank>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
                <View style={styles.buttonBox}>
                    <Button type="primary" style={styles.button} onClick={this.submitInfo} activeStyle={false}>提交</Button>
                </View>
                <ActivityIndicator toast animating={loading} />
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
  )(EditCompany3));