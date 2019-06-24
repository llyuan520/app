// Created by Lee on 2018/12/10
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
    selBox:{
        marginTop:40,
        marginBottom:40,
    },
    selLeft:{
        position:'absolute',
        left:0,
        paddingTop:10,
        paddingBottom:10,
        width:'50%',
        
        
        borderBottomColor:'#067DC6',
        borderBottomWidth:1,
        borderTopColor:'#067DC6',
        borderTopWidth:1,
        borderLeftColor:'#067DC6',
        borderLeftWidth:1,
        borderRightColor:'#067DC6',
        borderRightWidth:1,
        borderBottomLeftRadius:8,
        borderTopLeftRadius:8
        
    },
    selLeftClick:{
        backgroundColor:'#fff',
    },
    selLeftDefault:{
        backgroundColor:'#067dc6',
        
    },
    selRight:{
        position:'absolute',
        right:0,
        paddingTop:10,
        paddingBottom:10,
        width:'50%',
        

        borderBottomColor:'#067DC6',
        borderBottomWidth:1,
        borderTopColor:'#067DC6',
        borderTopWidth:1,
        borderLeftColor:'#067DC6',
        borderLeftWidth:1,
        borderRightColor:'#067DC6',
        borderRightWidth:1,
        borderBottomRightRadius:8,
        borderTopRightRadius:8
    },
    selRightClick:{
        backgroundColor:'#067dc6',
    },
    selRightDefault:{
        backgroundColor:'#fff',
        
    },
    selLeftText:{
        textAlign:'center',
        color:'#fff',
    },
    selLeftTextClick:{
        textAlign:'center',
        color:'#067DC6',
    },
    selRightText:{
        textAlign:'center',
        color:"#067DC6",
    },
    selRightTextClick:{
        textAlign:'center',
        color:"#fff",
    },
    buttonBox:{
        // paddingTop:5,
        // paddingBottom:5,
        // paddingLeft:5,
        // paddingRight:5,
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

  
class EditCompany1 extends React.Component{
    state={
        loading:false,
        isThreetoone:1,//营业执照
        name:"",//公司名称
        companyType:"",//公司类型
        taxType:"",//纳税人类型
        generalBusinessScope:"",//一般经营范围
        creditCode:"",//统一社会信用码
        registerNumber:"",//注册号
        taxNumber:"",//税务登记号
        organizationCode:"",//组织机构代码
        specialBusinessScope:"",//特殊经营范围
        id:""//公司id
    }
    submitInfo = ()=>{
        this.props.form.validateFields({ force: true }, (error,value) => {//校验并获取一组输入域的值
            if(error){
                Toast.info('您有未填写的必填项或者格式有误！',2)
            }else{
                this.setState({
                    loading:true
                })
                const userId = this.props.user.userId;
                const createBy = this.props.user.username;
                let company = value;
                company.id = this.state.id;
                company.createBy = createBy;
                company.isThreetoone = this.state.isThreetoone;
                // alert(JSON.stringify(company))
                // return
                cleanParams(company);
                // console.log(JSON.stringify(company))
                // return
                request('/company/updateCompany',{
                    method:'POST',
                    body:{
                        "company": company,
                        "userId": userId
                    }
                }).then(res=>{
                    this.setState({
                        loading:false
                    })
                    if(res){
                        this.props.navigation.navigate("EditCompany2",this.props.navigation.state.params);
                    }
                })

            }
        })
    }
    onSwitch = (flag)=>{
        this.setState({
            isThreetoone:flag
        })
    }
    componentWillMount() {
        const {isThreetoone, name, companyType, taxType, generalBusinessScope, id,
            creditCode, registerNumber, taxNumber, organizationCode, specialBusinessScope } = this.props.navigation.state.params;
        this.setState({
            isThreetoone,//营业执照
            name,//公司名称
            companyType,//公司类型
            taxType,//纳税人类型
            generalBusinessScope,//一般经营范围
            creditCode,//统一社会信用码
            registerNumber,//注册号
            taxNumber,//税务登记号
            organizationCode,//组织机构代码
            specialBusinessScope,//特殊经营范围
            id//公司id
        });
    }
    render(){
        const { loading, companyType, taxType, isThreetoone,
            name, generalBusinessScope, creditCode, registerNumber, taxNumber, organizationCode, specialBusinessScope } = this.state;
        const taxTypeArr = [
                {name:'一般纳税人',value:'0'},
                {name:'小规模纳税人',value:'1'},
            ];
        let taxTypeName;
        taxTypeArr.forEach(item =>{
            if(item.value === taxType){
                taxTypeName = item.name
            }
        }) 
        const companyTypeArr = [
                {name:'有限责任公司',value:'1'},
                {name:'国内合资',value:'2'},
            ];
        let companyTypeName;
        companyTypeArr.forEach(item =>{
            if(item.value === companyType){
                companyTypeName = item.name
            }
        }) 
        return(
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader title={'基本信息'}/>
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
                                            label:"企业名称",
                                            fieldName:"name",
                                            fieldDecoratorOptions:{
                                                initialValue:name,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入验证码！',
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: name,
                                                // placeholder:'222',
                                                // maxLength:3
                                            }
                                        },
                                        {
                                            type:"ActionSheet",
                                            label:"企业类型",
                                            fieldName:'companyType',
                                            buttoms: companyTypeArr,
                                            fieldDecoratorOptions:{
                                                initialValue:companyType,
                                                rules: [{
                                                    required: true,
                                                }],
                                            },
                                            componentProps:{
                                                value: companyTypeName,
                                            }
                                        },
                                        {
                                            type:"ActionSheet",
                                            label:"纳税人类型",
                                            fieldName:'taxType',
                                            buttoms: taxTypeArr,
                                            fieldDecoratorOptions:{
                                                initialValue:taxType,
                                                rules: [{
                                                    required: true,
                                                }],
                                            },
                                            componentProps:{
                                                value: taxTypeName,
                                            }
                                        },
                                        {
                                            type:"InputItem",
                                            label:"一般经营范围",
                                            fieldName:"generalBusinessScope",
                                            showRequired:true,
                                            fieldDecoratorOptions:{
                                                initialValue:generalBusinessScope,
                                                rules: [
                                                    {
                                                        required: false,
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: generalBusinessScope,
                                                // placeholder:'222',
                                                // maxLength:3
                                            }
                                        },
                                        {
                                            type:"InputItem",
                                            label:"特殊经营范围",
                                            fieldName:"specialBusinessScope",//缺少
                                            showRequired:true,
                                            fieldDecoratorOptions:{
                                                initialValue:specialBusinessScope,
                                                rules: [
                                                    {
                                                        required: false,
                                                        // message: '请输入验证码！',
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: specialBusinessScope ,
                                                // placeholder:'222',
                                                // maxLength:3
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
                                <View style={styles.selBox}>
                                    <TouchableOpacity
                                    onPress={() => this.onSwitch(1)}
                                    style={
                                        isThreetoone == 1 ?
                                        {...styles.selLeft,...styles.selLeftDefault}
                                        :
                                        {...styles.selLeft,...styles.selLeftClick}
                                    }
                                    >
                                        <Text
                                        style={
                                            isThreetoone == 1 ?
                                            styles.selLeftText
                                            :
                                            styles.selLeftTextClick
                                        }
                                        >
                                            多证合一营业执照
                                        </Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity
                                    onPress={() => this.onSwitch(2)}
                                    style={
                                        isThreetoone == 1 ?
                                        {...styles.selRight,...styles.selRightDefault}
                                        :
                                        {...styles.selRight,...styles.selRightClick}
                                    }
                                    >
                                        <Text
                                        style={styles.selRightText}
                                        style={
                                            isThreetoone == 1 ?
                                            styles.selRightText
                                            :
                                            styles.selRightTextClick
                                        }
                                        >
                                            普通营业执照
                                        </Text>
                                        
                                    </TouchableOpacity>
                                </View>
                                <View>
                                {
                                    isThreetoone == 1 ?
                                    InputTemplet(this.props.form, 
                                        [{
                                            type:"Number",
                                            label:"统一社会信用代码",
                                            fieldName:"creditCode",
                                            fieldDecoratorOptions:{
                                                initialValue:creditCode,
                                                rules: [
                                                    {
                                                        required: isThreetoone == 1 ? true :false,
                                                        // message: '请输入验证码！',
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: creditCode,
                                                // placeholder:'222',
                                                // maxLength:3
                                            }
                                        }],
                                         (key, data) =>{
                                            this.setState({
                                                [key]: data
                                            })
                                         }
                                    )
                                    :
                                    InputTemplet(this.props.form, 
                                        [{
                                            type:"Number",
                                            label:"注册号",
                                            fieldName:"registerNumber",
                                            fieldDecoratorOptions:{
                                                initialValue:registerNumber,
                                                rules: [
                                                    {
                                                        // required: false,
                                                        // message: '请输入验证码！',
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: registerNumber,
                                                // placeholder:'222',
                                                // maxLength:3
                                            }
                                        },
                                        {
                                            type:"Number",
                                            label:"税务登记号",
                                            fieldName:"taxNumber",
                                            fieldDecoratorOptions:{
                                                initialValue:taxNumber,
                                                rules: [
                                                    {
                                                        required: isThreetoone == 2 ? true :false,
                                                        // message: '请输入验证码！',
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: taxNumber,
                                                // placeholder:'222',
                                                // maxLength:3
                                            }
                                        },
                                        {
                                            type:"Number",
                                            label:"组织机构代码",
                                            fieldName:"organizationCode",
                                            fieldDecoratorOptions:{
                                                initialValue:organizationCode,
                                                rules: [
                                                    {
                                                        required: false,
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue: organizationCode,
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
                                </View>
                            </WingBlank>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
                <View style={styles.buttonBox}>
                    <Button type="primary" style={styles.button} onClick={this.submitInfo}>下一步</Button>
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
  )(EditCompany1));

