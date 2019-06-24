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
class EditCompany2 extends React.Component{
    state={
        id:"",
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
                const userId = this.props.user.userId;
                let companyTaxInfo = value;
                cleanParams(companyTaxInfo);
                if(JSON.stringify(companyTaxInfo) === "{}"){
                    //跳过
                    this.props.navigation.navigate("EditCompany3",this.props.navigation.state.params)
                }else{
                    //保存
                    if(this.state.id === ''){
                        companyTaxInfo.companyId = this.props.user.company_id
                    }else{
                        companyTaxInfo.id = this.state.id
                    }
                    let param = {
                        "companyTaxInfo": companyTaxInfo,
                        "userId": userId
                    }
                    request('/company/updateCompany',{
                        method:'POST',
                        body:param
                    }).then(res=>{
                        this.setState({
                            loading:false
                        })
                        if(res){
                            this.props.navigation.navigate("EditCompany3");
                        }else{
                            Toast.info(res.msg,2)
                        }
                    })
                }
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
                if(res.data.companyTaxInfo){
                    const { bankOfDeposit, bankAccount, openingBankNumber, openingBankName, id,
                        taxControlType, ticketType, tickerOpening, tickerOpeningMailbox, generalTicketLimit, specialTicketLimit } = res.data.companyTaxInfo;
                    this.setState({ bankOfDeposit, bankAccount, openingBankNumber, openingBankName, id,
                        taxControlType, ticketType, tickerOpening, tickerOpeningMailbox, generalTicketLimit, specialTicketLimit })    
                }
            }
        })
    }
    componentWillMount() {
        this.CompanyDetail();
    }
    render(){
        const { loading, bankOfDeposit, bankAccount, openingBankNumber, openingBankName, taxControlType, ticketType,
            tickerOpening, tickerOpeningMailbox, generalTicketLimit, specialTicketLimit } = this.state;
        const taxControlTypeArr = [
                {name:'旺信',value:'0'},
                {name:'百旺',value:'1'},
              ]
        let taxControlTypeName;
        taxControlTypeArr.forEach(item =>{
            if(item.value === taxControlType){
                taxControlTypeName = item.name
            }
        }) 
        const ticketTypeArr = [
            {name:'只开专票',value:'s'},
            {name:'只开普票',value:'c'},
            {name:'即开普票又开专票',value:'cs'},
          ]
        let ticketTypeName;
        ticketTypeArr.forEach(item =>{
            if(item.value === ticketType){
                ticketTypeName = item.name
            }
        })
        return(
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader 
                    title={'税务信息'}
                    jump={true}
                    jumpFun={()=>{this.props.navigation.navigate("EditCompany3")}}
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
                                            buttoms: taxControlTypeArr,
                                            fieldDecoratorOptions:{
                                                initialValue:taxControlType,
                                                rules: [{
                                                    required: false,
                                                }],
                                            },
                                            componentProps:{
                                                value: taxControlTypeName,
                                            }
                                        },
                                        
                                        {
                                            type:"ActionSheet",
                                            label:"开票类型",
                                            fieldName:'ticketType',
                                            buttoms: ticketTypeArr,
                                            fieldDecoratorOptions:{
                                                initialValue:ticketType,
                                                rules: [{
                                                    required: false,
                                                }],
                                            },
                                            componentProps:{
                                                value: ticketTypeName,
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
                                                initialValue:`${generalTicketLimit}`,
                                                rules: [
                                                    {
                                                        required: false,
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: `${generalTicketLimit}`,
                                            }
                                        },
                                        {
                                            type:"Number",
                                            label:"专票票面限制金额",
                                            fieldName:"specialTicketLimit",
                                            showRequired:true,
                                            fieldDecoratorOptions:{
                                                initialValue:`${specialTicketLimit}`,
                                                rules: [
                                                    {
                                                        required: false,
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue:`${specialTicketLimit}`,
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
    ({ user }) => ({
      user
    }),
    dispatch => ({
        login: bindActions(dispatch).login,
    })
  )(EditCompany2));