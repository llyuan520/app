// Created by Luoshj on 2018/11/3
import React from 'react';
import { StyleSheet, View, Text,Image, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, InputItem, WingBlank, ActivityIndicator, Tabs, Toast, ActionSheet } from "antd-mobile-rn";
import { createForm } from "rc-form";
import { BackHeader } from '../../components'
import { request } from "../../utils";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    introductionStyle:{
        fontSize: 12,
        color: '#CCCCCC',
        paddingBottom:25
    },
    inputStyle: {
        // marginTop: 15,
        // marginBottom:10,
        paddingBottom:15,
        paddingTop:15,
        paddingLeft: 0,
        paddingRight: 5,
        marginLeft: 10,
        // marginRight: 0,
        
        height: 50,
        width:'100%',
    },
    
  });
  //-----------------------------------------------------------
  
  //-----------------------------------------------------------
class CompanyHome extends React.Component {

    state={
        loading:false,
        clicked: '',
        data:{}
    }
    //查企业详情
    CompanyDetail = () =>{
        request('/company/findCurrCompanyDetail',{
            method:'GET',
            params:{}
        }).then(res=>{
            if(res){
                console.log(JSON.stringify(res))    
                this.setState({
                    data:{ ...res.data.company, ...res.data.companyTaxInfo, ...res.data.companyContact},
                })
            }
        })
    }
    componentWillMount() {
        this.CompanyDetail();
    }
    render(){
        //-----------------------------------------------------------
        const tabs = [
            { title: '基本信息'},
            { title: '税务信息'},
            { title: '其他信息'},
          ];
        //-----------------------------------------------------------
        const { data } = this.state;
        const taxTypeArr = [
            {name:'一般纳税人',value:'0'},
            {name:'小规模纳税人',value:'1'},
        ];
        let taxTypeName = '';//data
        taxTypeArr.forEach(item =>{
            if(item.value === data.taxType){
                taxTypeName = item.name
            }
        }) 
        const companyTypeArr = [
            {name:'有限责任公司',value:'1'},
            {name:'国内合资',value:'2'},
        ];
        let companyTypeName = '';//data
        companyTypeArr.forEach(item =>{
            if(item.value === data.companyType){
                companyTypeName = item.name
            }
        })

        const taxControlTypeArr = [
            {name:'旺信',value:'0'},
            {name:'百旺',value:'1'},
          ]
    let taxControlTypeName= '';
    if(data.taxControlType){
        taxControlTypeArr.forEach(item =>{
            if(item.value === data.taxControlType){
                taxControlTypeName = item.name
            }
        }) 
    }
    const ticketTypeArr = [
        {name:'只开专票',value:'s'},
        {name:'只开普票',value:'c'},
        {name:'即开普票又开专票',value:'cs'},
      ]
    let ticketTypeName= '';
    if(data.ticketType){
        ticketTypeArr.forEach(item =>{
            if(item.value === data.ticketType){
                ticketTypeName = item.name
            }
        })
    }
    
        return(
                <View style={styles.container}>
                    <WingBlank>
                        <BackHeader title={'企业完整信息'} />
                    </WingBlank>
                        <View style={{ flex: 1 }}>
                            <Tabs tabs={tabs}>
                                <View>
                                    <ScrollView style={{height:'100%'}}>
                                        <WingBlank>
                                            <InputItem
                                            style={styles.inputStyle}
                                            labelNumber={7}
                                            extra={
                                                <Text style={{fontSize:18}}> { companyTypeName } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>企业类型</Text>
                                            </InputItem>
                                            <InputItem
                                            style={styles.inputStyle}
                                            labelNumber={7}
                                            extra={
                                                <Text style={{fontSize:18}}> { taxTypeName } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>纳税人类型</Text>
                                            </InputItem>
                                            <InputItem
                                            style={styles.inputStyle}
                                            labelNumber={7}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.generalBusinessScope ? data.generalBusinessScope : "" } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>一般经营范围</Text>
                                            </InputItem>
                                            <InputItem
                                            style={styles.inputStyle}
                                            labelNumber={7}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.specialBusinessScope ? data.specialBusinessScope : "" } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>特殊经营范围</Text>
                                            </InputItem>
                                            <InputItem
                                            style={styles.inputStyle}
                                            labelNumber={7}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.registerNumber ? data.registerNumber : "" } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>注册号</Text>
                                            </InputItem>
                                            <InputItem
                                            style={styles.inputStyle}
                                            labelNumber={7}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.taxNumber ? data.taxNumber : "" } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>税务登记号</Text>
                                            </InputItem>
                                            <InputItem
                                            style={styles.inputStyle}
                                            labelNumber={7}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.organizationCode ? data.organizationCode : "" } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>组织机构代码</Text>
                                            </InputItem>
                                            <InputItem
                                            style={styles.inputStyle}
                                            labelNumber={7}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.creditCode ? data.creditCode : "" } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>统一社会信用码</Text>
                                            </InputItem>

                                        </WingBlank>
                                    </ScrollView>
                                </View>
                                {/* ----------------- */}
                                <View>
                                    <ScrollView>
                                        <WingBlank>
                                            <InputItem
                                            labelNumber={7}
                                            style={styles.inputStyle}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.bankOfDeposit ? data.bankOfDeposit : "" } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>开户银行</Text>
                                            </InputItem>
                                            <InputItem
                                            labelNumber={7}
                                            style={styles.inputStyle}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.bankAccount ? data.bankAccount : "" } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>开户行网点</Text>
                                            </InputItem>
                                            <InputItem
                                            labelNumber={7}
                                            style={styles.inputStyle}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.openingBankNumber ? data.openingBankNumber : "" } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>开户行账号</Text>
                                            </InputItem>
                                            <InputItem
                                            labelNumber={7}
                                            style={styles.inputStyle}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.openingBankName ? data.openingBankName : "" } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>开户名</Text>
                                            </InputItem>
                                            <InputItem
                                            labelNumber={7}
                                            style={styles.inputStyle}
                                            extra={
                                                <Text style={{fontSize:18}}> { taxControlTypeName } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>税控盘类型</Text>
                                            </InputItem>
                                            <InputItem
                                            labelNumber={7}
                                            style={styles.inputStyle}
                                            extra={
                                                <Text style={{fontSize:18}}> { ticketTypeName } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>开票类型</Text>
                                            </InputItem>
                                            <InputItem
                                            labelNumber={7}
                                            style={styles.inputStyle}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.tickerOpening ? data.tickerOpening : "" } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>开票用户</Text>
                                            </InputItem>
                                            <InputItem
                                            labelNumber={7}
                                            style={styles.inputStyle}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.tickerOpeningMailbox ? data.tickerOpeningMailbox : "" } </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>开票用户邮箱</Text>
                                            </InputItem>

                                        </WingBlank>
                                    </ScrollView>
                                </View>
                                {/* ----------------- */}
                                {/* ----------------- */}
                                <View>
                                    <ScrollView>
                                        <WingBlank>
                                            <InputItem
                                            labelNumber={7}
                                            style={styles.inputStyle}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.companyPhone ? data.companyPhone : ""} </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>公司电话</Text>
                                            </InputItem>
                                            <InputItem
                                            labelNumber={7}
                                            style={styles.inputStyle}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.facsimile ? data.facsimile : ""} </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>传真号码</Text>
                                            </InputItem>
                                            <InputItem
                                            labelNumber={7}
                                            style={styles.inputStyle}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.companyEmail ? data.companyEmail : ""} </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>电子邮箱</Text>
                                            </InputItem>
                                            <InputItem
                                            labelNumber={7}
                                            style={styles.inputStyle}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.registerAddress ? data.registerAddress : ""} </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>注册地</Text>
                                            </InputItem>
                                            <InputItem
                                            labelNumber={7}
                                            style={styles.inputStyle}
                                            extra={
                                                <Text style={{fontSize:18}}> { data.locationAddress ? data.locationAddress : ""} </Text>
                                            }
                                            editable={false}
                                            >
                                                <Text style={{color:'#888',fontSize:18}}>所在地</Text>
                                            </InputItem>

                                        </WingBlank>
                                    </ScrollView>
                                </View>
                                {/* ----------------- */}
                            </Tabs>
                        </View>
                </View>
        )

    }
    
}

export const title = 'Tabs';
export default createForm()(CompanyHome)