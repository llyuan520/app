// Created by Lee on 2018/12/13
import React from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView,Text, TouchableOpacity } from "react-native";
import { WingBlank,Button,ActivityIndicator, Toast } from "antd-mobile-rn";
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

  
class CreateCompany2 extends React.Component{
    state={
        loading:false,
        CompanyId:"",//公司id
        bankOfDeposit:"",//开户银行
        bankAccount:"",//开户银行网点
        openingBankNumber:"",//开户行账号
        openingBankName:"",//开户名 
        taxControlType:"",//税控盘类型
        ticketType:"",//开票类型
        tickerOpening:"",//开票用户
        tickerOpeningMailbox:"",//开票用户邮箱
        generalTicketLimit:"",//普票票面限制金额
        specialTicketLimit:"",//专票票面限制金额
        
        
        
    }
    submitInfo = ()=>{
        this.props.form.validateFields({ force: true }, (error,value) => {//校验并获取一组输入域的值
            if(error){
                Toast.info('您有未填写的必填项或者格式有误！',2)
            }else{
                // this.setState({
                //     loading:true
                // })
                const userId = this.props.user.userId;
                let companyTaxInfo = value;
                companyTaxInfo.companyId = this.state.CompanyId
                companyTaxInfo.isStop = 1;
                // return;
                cleanParams(companyTaxInfo);
                // alert(JSON.stringify(companyTaxInfo))
                let param = {
                    "companyTaxInfo": companyTaxInfo,
                    "userId": userId
                }
                console.log(JSON.stringify(param))
                request('/company/updateCompany',{
                    method:'POST',
                    body:param
                }).then(res=>{
                    if(res){
                        // alert(JSON.stringify(res))
                        this.setState({
                            loading:false
                        })
                        if(res.code === 1){
                            this.props.navigation.navigate("CreateCompany3",this.state.CompanyId);
                        }else{
                            Toast.info(res.msg,2)
                        }
                    }
                })

            }
        })
    }
    componentWillMount() {
        const CompanyId=this.props.navigation.state.params;
        this.setState({CompanyId:CompanyId});
    }
    render(){
        const { loading, bankOfDeposit, bankAccount, openingBankNumber, openingBankName, taxControlType, ticketType,
            tickerOpening, tickerOpeningMailbox, generalTicketLimit, specialTicketLimit, CompanyId } = this.state;
        return(
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader 
                    title={'税务信息'}
                    jump={true}
                    jumpFun={()=>{this.props.navigation.navigate("CreateCompany3",CompanyId)}}
                    />
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
                                            type:"InputItem",
                                            label:"开户银行",
                                            fieldName:"bankOfDeposit",
                                            fieldDecoratorOptions:{
                                                initialValue:bankOfDeposit,
                                                rules: [
                                                    {

                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: bankOfDeposit,
                                            }
                                        },
                                        {
                                            type:"InputItem",
                                            label:"开户银行网点",
                                            fieldName:"bankAccount",
                                            fieldDecoratorOptions:{
                                                initialValue:bankAccount,
                                                rules: [
                                                    {
                                                        
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: bankAccount,
                                            }
                                        },
                                        {
                                            type:"Number",
                                            label:"开户行账号",
                                            fieldName:"openingBankNumber",
                                            fieldDecoratorOptions:{
                                                initialValue:openingBankNumber,
                                                rules: [
                                                    {
                                                        
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: openingBankNumber,
                                            }
                                        },
                                        {
                                            type:"InputItem",
                                            label:"开户名",
                                            fieldName:"openingBankName", 
                                            fieldDecoratorOptions:{
                                                initialValue:openingBankName,
                                                rules: [
                                                    {
                                                       
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: openingBankName,
                                            }
                                        },
                                        {
                                            type:"ActionSheet",
                                            label:"税控盘类型",
                                            fieldName:'taxControlType',
                                            buttoms: [
                                                {name:'税控盘类型1'},
                                                {name:'税控盘类型2'},
                                                {name:'税控盘类型3'},
                                              ],
                                            fieldDecoratorOptions:{
                                                initialValue:taxControlType,
                                                rules: [{
                                                    required: false,
                                                }],
                                            },
                                            componentProps:{
                                                value: taxControlType,
                                            }
                                        },
                                        
                                        {
                                            type:"ActionSheet",
                                            label:"开票类型",
                                            fieldName:'ticketType',
                                            buttoms: [
                                                {name:'开票类型1'},
                                                {name:'开票类型2'},
                                                {name:'开票类型3'},
                                              ],
                                            fieldDecoratorOptions:{
                                                initialValue:ticketType,
                                                rules: [{
                                                    required: false,
                                                }],
                                            },
                                            componentProps:{
                                                value: ticketType,
                                            }
                                        },
                                        {
                                            type:"InputItem",
                                            label:"开票用户",
                                            fieldName:"tickerOpening",
                                            showRequired:true,
                                            fieldDecoratorOptions:{
                                                initialValue:tickerOpening,
                                                rules: [
                                                    {
                                                        required: false,
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: tickerOpening,
                                            }
                                        },
                                        {
                                            type:"InputItem",
                                            label:"开票用户邮箱",
                                            fieldName:"tickerOpeningMailbox",
                                            showRequired:true,
                                            fieldDecoratorOptions:{
                                                initialValue:tickerOpeningMailbox,
                                                rules: [
                                                    {
                                                        required: false,
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: tickerOpeningMailbox,
                                            }
                                        },
                                        {
                                            type:"Number",
                                            label:"普票票面限制金额",
                                            fieldName:"generalTicketLimit",
                                            showRequired:true,
                                            fieldDecoratorOptions:{
                                                initialValue:generalTicketLimit,
                                                rules: [
                                                    {
                                                        required: false,
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: generalTicketLimit,
                                            }
                                        },
                                        {
                                            type:"Number",
                                            label:"专票票面限制金额",
                                            fieldName:"specialTicketLimit",
                                            showRequired:true,
                                            fieldDecoratorOptions:{
                                                initialValue:specialTicketLimit,
                                                rules: [
                                                    {
                                                        required: false,
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: "",
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
                    <Button type="primary" style={styles.button} onClick={this.submitInfo} activeStyle={false}>下一步</Button>
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
  )(CreateCompany2));